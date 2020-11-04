import { BodyParams, Controller, Get, PathParams, Post } from '@tsed/common';
import { BadRequest, NotFound } from '@tsed/exceptions';
import { Usuario } from '../model/usuario.entity';

@Controller("/usuarios")
export class UsuarioCtrl {

     @Post()
     async save(@BodyParams() usuario: Usuario) {

          if(usuario.isNew) {
               const usuarioExistente = await Usuario.findOne({ email: usuario.email })
               if (usuarioExistente) {
                    throw new BadRequest("Usuário já está cadastrado!")
               }
          }
          
          usuario = await usuario.save()
          return usuario;
     }

     @Get("/:id")
     async get(@PathParams("id") id: number) {
          const usuario = await Usuario.findOne({ id })

          if(!usuario) {
               throw new NotFound("Usuário não encontrado")
          }

          return usuario
     }

}