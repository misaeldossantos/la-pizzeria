import { NivelAcessoEnum } from './../../usuario/model/nivel-acesso-enum';
import { GeneralAuthMiddleware } from './middlewares/GeneralAuthMiddleware';
import { UseAuth } from "@tsed/common";
import { applyDecorators } from "@tsed/core";

function authGenerator(middleware: any, options: any) {
    return applyDecorators(
        UseAuth(middleware, options),
    );
}

export function CustomAuth(options: { niveisAcesso?: NivelAcessoEnum[], isFile?: boolean } = {}) {
    const {niveisAcesso} = options

    return authGenerator(GeneralAuthMiddleware, {...options, customAuth(jwtDecoded: any) {
        console.log(jwtDecoded)
        if(!jwtDecoded.userId) return false
        const nivelAcesso = jwtDecoded.userType
        if((!niveisAcesso || !niveisAcesso.length) || niveisAcesso.includes(nivelAcesso)) {
            return true
        }
        return false
    }});
}
