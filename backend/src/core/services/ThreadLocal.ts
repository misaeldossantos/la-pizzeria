import {Service} from "@tsed/common";
import { Usuario } from '../../usuario/model/usuario.entity';

const als = require("async-local-storage")

als.enable();
als.enableLinkedTop();

const USUARIO_ID = 'usuarioId';

@Service()
export class ThreadLocal {

    token: string;

    constructor() {
        console.log("criando thread local")
    }

    public als() {
        return als;
    }

    public getUsuarioId(): number {
        return this.get(USUARIO_ID);
    }

    get usuarioId(): number {
        return this.get(USUARIO_ID);
    }

    public getUsuario(): Promise<Usuario> {
        return Usuario.findOneOrFail(this.get(USUARIO_ID));
    }

    public getUsuarioBase(): Usuario {
        return {id: this.getUsuarioId()} as Usuario;
    }

    public setUsuarioId(id: number) {
        console.log("auth id", id)
        this.set(USUARIO_ID, id);
    }

    public get<T>(key: string): T {
        return als.get(key);
    }

    public set = (key: string, value: any) => {
        als.set(key, value);
    }
}