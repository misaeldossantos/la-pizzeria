import { StatusComandaEnum } from './../model/status-comanda-enum';
import { Comanda } from './../../comanda/model/comanda.entity';
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
import { Like } from "typeorm";
import { PaginatedList } from "../../core/model/paginated-list";

@Controller("/comandas")
export class ComandaCtrl {
  @Post()
  async save(@BodyParams() comanda: Comanda) {
    let comandaAnterior = null;

    if (comanda.isNew) {
      const mesaOcupada = !(await comanda.mesa).disponivel
      if(mesaOcupada) {
        throw new BadRequest("Mesa já está ocupada!")
      }
    } else {
      comandaAnterior = await Comanda.findOne({ id: comanda.id });
    }

    return comanda.save();
  }

  @Get("/:id")
  async get(@PathParams("id") id: number) {
    const comanda = await Comanda.findOne({ id });

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
    @QueryParams("status") status: StatusComandaEnum,
  ): Promise<PaginatedList<Comanda>> {
    const paginatedList = new PaginatedList<Comanda>();
    paginatedList.page = page;
    paginatedList.rpp = rpp;
    const options: any = {}
    if(q) {
      options.id = q
    }
    if(mesa) {
      options.mesa = {
        id: mesa
      }
    }
    if(garcom) {
      options.garcom = {
        id: garcom
      }
    }
    if(paraViagem) {
      options.paraViagem = paraViagem
    }
    if(status) {
      options.status = status
    }
    paginatedList.list = await Comanda.find(options);
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
}
