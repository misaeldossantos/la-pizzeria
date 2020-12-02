import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  QueryParams,
} from "@tsed/common";
import { BadRequest, NotFound } from "@tsed/exceptions";
import { Equal, IsNull, Like, Not } from "typeorm";
import { PaginatedList } from "../../core/model/paginated-list";
import { Mesa } from "../model/mesa.entity";
import { CustomAuth } from "../../core/auth/CustomAuth";
import { NivelAcessoEnum } from "../../usuario/model/nivel-acesso-enum";
import { Comanda } from "../../comanda/model/comanda.entity";
import { Query } from "typeorm/driver/Query";
import { StatusComandaEnum } from "../../comanda/model/status-comanda-enum";

@CustomAuth({ niveisAcesso: [NivelAcessoEnum.ADMINISTRADOR] })
@Controller("/mesas")
export class MesaCtrl {
  @Post()
  async save(@BodyParams() mesa: Mesa) {
    if (mesa.isNew) {
      mesa.disponivel = true;
    } else {
      delete mesa.disponivel;
    }

    const mesaExistente = mesa.isNew
      ? await Mesa.findOne({
          numero: mesa.numero,
        })
      : await Mesa.findOne({
          numero: mesa.numero,
          id: Not(Equal(mesa.id)),
        });

    if (mesaExistente) {
      throw new BadRequest("Mesa já está cadastrada!");
    }

    return mesa.save();
  }

  @Get("/:id")
  async get(@PathParams("id") id: number) {
    const mesa = await Mesa.findOne({ id });

    if (!mesa) {
      throw new NotFound("Mesa não encontrada");
    }

    return mesa;
  }

  @Get()
  async list(
    @QueryParams("page") page: number = 1,
    @QueryParams("rpp") rpp: number = 10,
    @QueryParams("q") q: string,
    @QueryParams("disponivel") disponivel: boolean
  ): Promise<PaginatedList<Mesa>> {
    const paginatedList = new PaginatedList<Mesa>();
    paginatedList.page = page;
    paginatedList.rpp = rpp;
    const where: any = {};
    if (q) {
      where.numero = Equal(q);
    }
    if (disponivel != null) {
      where.disponivel = disponivel;
    }

    paginatedList.list = await Mesa.find({
      where,
      order: {
        numero: "ASC",
      },
    });
    return paginatedList;
  }

  @Post("/intervalo")
  async gerarInvervalo(
    @BodyParams("min") min: number,
    @BodyParams("max") max: number
  ) {
    if (min > max) {
      throw new BadRequest("Número mínimo é maior que máximo");
    }

    for (let i = min; i <= max; i++) {
      if (await Mesa.findOne({ numero: i })) {
        continue;
      }
      await Mesa.create({
        numero: i,
        disponivel: true,
      }).save();
    }

    return true;
  }

  @Delete("/:id")
  async delete(@PathParams("id") id: number) {
    const mesa = await Mesa.findOne({ id });
    if (!mesa) {
      throw new NotFound("Mesa não existe!");
    }

    await mesa.remove();
    return {
      message: "Registro excluído com sucesso!",
    };
  }

  @Get("/numero/:numero/comanda")
  async getComandaMesa(@PathParams("numero") numero: number) {
    let comanda = null
    try {
      const mesa = await Mesa.findOneOrFail({ numero });
      comanda = await Comanda.findOneOrFail({
        where: { mesa: { id: mesa.id } },
        relations: ["mesa", "garcom"],
      });
    } catch (e) {
      throw new BadRequest(`Não existe comanda para a mesa ${numero}`);
    }
    if (comanda.status === StatusComandaEnum.PAGO) {
      throw new BadRequest("Comanda já está finalizada!");
    }
    return comanda;
  }
}
