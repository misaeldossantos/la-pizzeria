import { ResponseFilter, Context, ResponseFilterMethods } from "@tsed/common";

var Readable = require('stream').Readable; 

function bufferToStream(buffer: Buffer) { 
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

@ResponseFilter("*/*")
export class AnyResponseFilter implements ResponseFilterMethods {
  transform(data: any, ctx: Context) {
    if (data instanceof Buffer) {
      return bufferToStream(data)
    }
    for(let key in data) {
      if(key.startsWith("__")) {
        data[key.replace(/[_]/gi, "")] = data[key]
      }
    }
    return data;
  }
}
