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
import { Usuario } from "../model/usuario.entity";

@Controller("/usuarios")
export class UsuarioCtrl {
  @Post()
  async save(@BodyParams() usuario: Usuario) {
    if (usuario.isNew) {
      const usuarioExistente = await Usuario.findOne({ email: usuario.email });
      if (usuarioExistente) {
        throw new BadRequest("Usuário já está cadastrado!");
      }
    }

    usuario = await usuario.save();
    return usuario;
  }

  @Get("/:id")
  async get(@PathParams("id") id: number) {
    const usuario = await Usuario.findOne({ id });

    if (!usuario) {
      throw new NotFound("Usuário não encontrado");
    }

    return usuario;
  }

  @Get()
  async list(
    @QueryParams("page") page: number = 1,
    @QueryParams("rpp") rpp: number = 10,
    @QueryParams("q") q: string
  ): Promise<PaginatedList<Usuario>> {
    const like = Like(`%${q}%`);
    const paginatedList = new PaginatedList<Usuario>();
    paginatedList.page = page;
    paginatedList.rpp = rpp;
    paginatedList.list = await Usuario.find({
      nome: like,
    });
    return paginatedList;
  }

  @Delete("/:id")
  async delete(@PathParams("id") id: number) {
    const usuario = await Usuario.findOne({id})
    if(!usuario) {
      throw new NotFound("Usuário não existe!")
    }

    await usuario.remove()
    return {
      message: "Excluído com sucesso!"
    }
  }
}
