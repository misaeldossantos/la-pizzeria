import { Arquivo } from './../model/arquivo.entity';
import { Controller, Post } from '@tsed/common';
import { MultipartFile } from '@tsed/multipartfiles';

@Controller("/arquivos")
export class ArquivoCtrl {

     @Post("/upload")
     async upload(
          @MultipartFile('file') file: any
     ) {
          const arquivo = new Arquivo()
          arquivo.nome = file.originalname
          arquivo.mimeType = file.mimetype
          arquivo.buffer = file.buffer
          return arquivo.save()
     }

}