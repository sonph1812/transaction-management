import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { excelConfig } from "../../interceptors/excelFile.interceptor";

export function ExcelDecorator() {
  return applyDecorators(
    UseInterceptors(FileInterceptor('file',excelConfig)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format:'binary'
          },
        },
      },
    }),
  );
}
