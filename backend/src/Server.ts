import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/typeorm";
import typeormConfig from "./config/typeorm";

export const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    "/api": [
      "${rootDir}/../**/*.ctrl{.ts,.js}"
    ]
  },
  swagger: [
    {
      path: "/docs"
    }
  ],
  typeorm: typeormConfig,
  exclude: [
    "**/*.spec.ts"
  ],
  logger: {
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json({ limit: '10mb' }))
      .use(bodyParser.urlencoded({
        extended: true,
        limit: '10mb', 
      }));
  }
}
