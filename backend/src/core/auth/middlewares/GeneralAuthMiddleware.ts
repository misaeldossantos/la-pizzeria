import { Forbidden, Unauthorized } from '@tsed/exceptions';
import { AuthService } from './../../../auth/service/AuthService';
import {EndpointInfo, IMiddleware, Inject, Middleware, Req} from "@tsed/common";
import * as _ from "lodash";

export function getAuthToken(request: any, options: any): string {
    if(options.isFile) {
        return request.query['authorization'];
    } else {
        const authorization = request.header('Authorization');
        return authorization? (authorization.split("Bearer")[1] || "").trim(): null;
    }
}

@Middleware()
export class GeneralAuthMiddleware implements IMiddleware {

    @Inject(AuthService)
    authService: AuthService;

    public use(@Req() request: Req, @EndpointInfo() endpoint: EndpointInfo) {
        const authOptions = endpoint.get(GeneralAuthMiddleware) || {};

        let token = getAuthToken(request, authOptions)
        if (!token) {
            throw new Unauthorized("Unauthorized");
        }
        const jwtDecoded = this.authService.decodeAndVerifyJwtToken(token);

        if(!authOptions.customAuth(jwtDecoded)) {
            throw new Forbidden("Sem permissão para acessar o recurso");
        }

        this.authService.setThreadLocalContext(token, jwtDecoded);

        // if (authOptions.roles) {
        //     if (!this.checkRole(authOptions, jwtDecoded.roles)) {
        //         throw new Forbidden("Sem permissão para acessar o recurso");
        //     }
        // }
    }

    private checkRole(authOptions: any, roles: string[]): boolean {
        return false
        // let authRoles;

        // return !_.isEmpty(authRoles.filter(r => roles.includes(r.value)));
    }
}
