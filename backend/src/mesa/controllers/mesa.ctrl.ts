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

@Controller("/mesas")
export class MesaCtrl {
  @Post()
  async save(@BodyParams() mesa: Mesa) {
    console.log("CHEGUEI!!!")
    if(mesa.isNew) {
      mesa.disponivel = true
    } else {
      delete mesa.disponivel
    }

    const mesaExistente = mesa.isNew? await Mesa.findOne({ 
      numero: mesa.numero,
    }): await Mesa.findOne({ 
      numero: mesa.numero,
      id: Not(Equal(mesa.id))
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
    @QueryParams("q") q: string
  ): Promise<PaginatedList<Mesa>> {
    const like = Like(`%${q}%`);
    const paginatedList = new PaginatedList<Mesa>();
    paginatedList.page = page;
    paginatedList.rpp = rpp;
    paginatedList.list = await Mesa.find({
      where: {
        numero: like
      },
      order: {
        numero: 'ASC'
      }
    });
    return paginatedList;
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
}
