import { ComandaItem } from "./../model/comanda-item.entity";
import { MesaService } from "./../../mesa/services/mesa.service";
import { StatusComandaEnum } from "./../model/status-comanda-enum";
import { Comanda } from "./../../comanda/model/comanda.entity";
import {
  BodyParams,
  Controller,
  Delete,
  Get,
  Inject,
  PathParams,
  Post,
  Put,
  QueryParams,
} from "@tsed/common";
import { BadRequest, NotFound } from "@tsed/exceptions";
import { Like } from "typeorm";
import { PaginatedList } from "../../core/model/paginated-list";
import { Mesa } from "../../mesa/model/mesa.entity";
import { ComandaService } from "../services/comanda.service";

@Controller("/comandas")
export class ComandaCtrl {
  @Inject(MesaService)
  mesaService: MesaService;

  @Inject(ComandaService)
  comandaService: ComandaService;

  @Post()
  async save(@BodyParams() comanda: Comanda) {
    const mesa = await comanda.mesa;
    if (comanda.isNew) {
      if (!mesa) {
        throw new BadRequest("Mesa é um parâmetro obrigatório!");
      }
      const { mesaDisponivel } = await Mesa.createQueryBuilder("mesa")
        .select("mesa.disponivel", "mesaDisponivel")
        .where("mesa.disponivel is true")
        .where("mesa.id = :id", { id: mesa.id })
        .getRawOne();

      if (!mesaDisponivel) {
        throw new BadRequest("Mesa já está ocupada!");
      }

      await this.mesaService.indisponibilizarMesa(mesa);
    }
    comanda.status = StatusComandaEnum.ABERTO;
    return comanda.save();
  }

  @Get("/:id")
  async get(@PathParams("id") id: number) {
    const comanda = await Comanda.findOne({
      where: { id },
      relations: ["mesa", "garcom"],
    });

    if (!comanda) {
      throw new NotFound("Comanda não encontrada");
    }

    return comanda;
  }

  @Get()
  async list(
    @QueryParams("page") page: number = 1,
    @QueryParams("rpp") rpp: number = 10,
    @QueryParams("q") q: number,
    @QueryParams("mesa") mesa: number,
    @QueryParams("garcom") garcom: number,
    @QueryParams("paraViagem") paraViagem: boolean,
    @QueryParams("status") status: StatusComandaEnum
  ): Promise<PaginatedList<Comanda>> {
    const paginatedList = new PaginatedList<Comanda>();
    paginatedList.page = page;
    paginatedList.rpp = rpp;
    const options: any = {};
    if (q) {
      options.id = q;
    }
    if (mesa) {
      options.mesa = {
        id: mesa,
      };
    }
    if (garcom) {
      options.garcom = {
        id: garcom,
      };
    }
    if (paraViagem) {
      options.paraViagem = paraViagem;
    }
    if (status) {
      options.status = status;
    }

    paginatedList.list = await Comanda.find({
      where: options,
      relations: ["mesa", "garcom"],
    });
    return paginatedList;
  }

  @Delete("/:id")
  async delete(@PathParams("id") id: number) {
    const comanda = await Comanda.findOne({ id });
    if (!comanda) {
      throw new NotFound("Comanda não existe!");
    }

    await comanda.remove();
    return {
      message: "Registro excluído com sucesso!",
    };
  }

  @Get("/:id/itens")
  async listItens(@PathParams("id") idComanda: number) {
    return ComandaItem.find({
      where: { comanda: { id: idComanda } },
      relations: ["produto"],
    });
  }

  @Post("/:id/itens")
  async salvarItem(
    @PathParams("id") idComanda: number,
    @BodyParams() item: ComandaItem
  ) {
    // TODO: atualizar valor total da comanda
    item.comanda = {
      id: idComanda,
    } as Comanda;

    const itemSalvo = await item.save();
    await this.comandaService.atualizaValorTotal(idComanda);

    return itemSalvo;
  }

  @Delete("/:idComanda/itens/:id")
  async deleteItem(
    @PathParams("idComanda") idComanda: number,
    @PathParams("id") id: number
  ) {
    const item = await ComandaItem.findOneOrFail({
      id,
      comanda: { id: idComanda },
    });
    item.remove();
    return item;
  }

  @Post("/:id/finalizar")
  async finalizarComanda(@PathParams("id") id: number) {
    await Comanda.createQueryBuilder()
      .update(Comanda)
      .set({ status: StatusComandaEnum.FINALIZADO })
      .where("id = :id", { id })
      .execute();
    return {
      message: "Comanda finalizada com sucesso!",
    };
  }

  @Post("/:id/itens/entrega")
  async notificarEntrega(
    @PathParams("id") idComanda: number,
    @BodyParams("ids") ids: number[]
  ) {
    await ComandaItem.createQueryBuilder()
      .update(ComandaItem)
      .set({ entregue: true })
      .where("id in (:ids)", { ids })
      .execute();
    this.comandaService.notificar(idComanda, ids);
  }
}
