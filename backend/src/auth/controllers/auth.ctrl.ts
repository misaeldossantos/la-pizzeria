import { ThreadLocal } from './../../core/services/ThreadLocal';
import { AuthService } from "../service/AuthService";
import { Usuario } from "../../usuario/model/usuario.entity";
import { BodyParams, Controller, Get, Inject, Post, UseAfter } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { CustomAuth } from "../../core/auth/CustomAuth";
import { ContentType } from '@tsed/schema';

@Controller("/auth")
export class AuthCtrl {
  @Inject(AuthService)
  private authService: AuthService;

  @Inject(ThreadLocal)
  private threadLocal: ThreadLocal;

  @Post("/login")
  async login(
    @BodyParams("email") email: string,
    @BodyParams("senha") senha: string
  ) {
    const usuario = await Usuario.findOne({
      email: email.toLowerCase(),
      senha,
    });

    if (!usuario) {
      throw new Unauthorized("Usuário ou senha incorretos");
    }

    return {
      token: this.authService.signJwtToken(usuario),
    };
  }

  @CustomAuth()
  @Get("/perfil")
  async getPerfil() {
    const usuarioId: number = await this.authService.getUsuarioId();
    const usuario: any = await Usuario.findOneOrFail({ id: usuarioId });
    delete usuario.senha;
    usuario.fotoUrl = usuario.fotoUrl + "?authorization=" + this.threadLocal.token
    return usuario;
  }

  @ContentType("application/octet-stream")
  @CustomAuth({isFile: true})
  @Get("/perfil/foto")
  async getFotoPerfil() {
     const usuarioId: number = await this.authService.getUsuarioId();
     const usuario: any = await Usuario.findOneOrFail({ id: usuarioId });
     const foto = await usuario.foto
     return await foto.buffer
  }
}
