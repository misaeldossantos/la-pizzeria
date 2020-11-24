import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  QueryParams,
  Inject,
  ReturnType,
} from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { Like } from "typeorm";
import { PaginatedList } from "../../core/model/paginated-list";
import { Usuario } from "../../usuario/model/usuario.entity";
import { Produto } from "./../model/produto.entity";
import { CustomAuth } from "../../core/auth/CustomAuth";
import { ContentType } from "@tsed/schema";
import { ThreadLocal } from "../../core/services/ThreadLocal";

const config = require("../../config/config.json");

@Controller("/produtos")
export class ProdutoCtrl {
  @Inject(ThreadLocal)
  private threadLocal: ThreadLocal;

  @Post()
  async save(@BodyParams() produto: Produto) {
    let produtoAnterior = null;

    if (!produto.isNew) {
      produtoAnterior = await Usuario.findOne({ id: produto.id });
      if (produtoAnterior) {
        const foto = await produtoAnterior?.foto;
        if (foto && foto?.id != produtoAnterior.foto?.id) {
          await foto.remove();
        }
      }
    }
    return produto.save();
  }

  @Get("/foto")
  async getFoto() {}

  @Get("/:id")
  @ReturnType(Produto)
  async get(@PathParams("id") id: number) {
    const produto = await Produto.findOne({ where: {id}, relations: ["ingredientes"] });

    if (!produto) {
      throw new NotFound("Produto não encontrado");
    }
    
    produto.ingredientes = await produto.ingredientes

    produto.fotoUrl =
        config.url +
        "/api/produtos/" +
        produto.id +
        "/foto?authorization=" +
        this.threadLocal.token;

    return produto;
  }

  @Get()
  async list(
    @QueryParams("page") page: number = 1,
    @QueryParams("rpp") rpp: number = 10,
    @QueryParams("q") q: string,
    @QueryParams("categoria") categoria?: string
  ): Promise<PaginatedList<Produto>> {
    const paginatedList = new PaginatedList<Produto>();
    paginatedList.page = page;
    paginatedList.rpp = rpp;
    const options: any = {};

    if (q) {
      const like = Like(`%${q}%`);
      options.descricao = like;
    }

    if(categoria) {
      options.categoria = categoria
    }

    paginatedList.list = await Produto.find(options);
    paginatedList.list.forEach((produto) => {
      produto.fotoUrl =
        config.url +
        "/api/produtos/" +
        produto.id +
        "/foto?authorization=" +
        this.threadLocal.token;
    });
    return paginatedList;
  }

  @Delete("/:id")
  async delete(@PathParams("id") id: number) {
    const produto = await Produto.findOne({ id });
    if (!produto) {
      throw new NotFound("Produto não existe!");
    }

    await produto.remove();
    return {
      message: "Registro excluído com sucesso!",
    };
  }

  @ContentType("application/octet-stream")
  @CustomAuth({ isFile: true })
  @Get("/:id/foto")
  async getFotoPerfil(@PathParams("id") id: number) {
    const produto: any = await Produto.findOneOrFail({ id });
    return (await produto.foto).buffer;
  }
}
