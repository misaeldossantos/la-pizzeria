import { Unauthorized } from '@tsed/exceptions';
import { Service } from "@tsed/common";
import * as jwt from "jsonwebtoken";
import { ThreadLocal } from '../../core/services/ThreadLocal';
import { Usuario } from '../../usuario/model/usuario.entity';

const AUTH_SECRET_TOKEN = "lapizzeria"

@Service()
export class AuthService {

    constructor(private threadLocal: ThreadLocal) {
    }

    async getUsuarioId(): Promise<number> {
        return this.threadLocal.getUsuarioId()
    }

    async find(id: string): Promise<Usuario> {
        return Usuario.findOneOrFail(id);
    }

    async create(usuario: Usuario): Promise<Usuario> {
        return usuario.save();
    }

    async update(usuario: Usuario): Promise<Usuario> {
        return usuario.save();
    }

    signJwtToken(usuario: Usuario) {
        return jwt.sign({
            userId: usuario.id,
            userType: usuario.nivelAcesso
        }, AUTH_SECRET_TOKEN);
    }

    decodeAndVerifyJwtToken(token: string) {
        try {
            return jwt.verify(token, AUTH_SECRET_TOKEN);
        } catch (e) {
            console.log(e)
            throw new Unauthorized(e);
        }
    }

    setThreadLocalContext(token: string, jwtDecoded: any) {
        this.threadLocal.token = token;
        this.threadLocal.setUsuarioId(jwtDecoded.userId);
    }

}