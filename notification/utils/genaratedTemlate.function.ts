/**
 *
 */
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import {
  BadRequestError,
  RequestValidationError,
  actionType,
  logger,
} from 'brk-gcl-libary';
import { validatationSchema } from './temlate.validatiton';

export async function genaretedHTMLfromTemplate(
  template: actionType,
  meta: object
) {
  async function loadingTemplate() {
    try {
      const templateFile = await fs.readFileSync(
        path.join(__dirname, `../template/${template}.hbs`),
        'utf-8'
      );

      return Handlebars.compile(templateFile);
    } catch (error) {
      throw new BadRequestError('Reading template error');
    }
  }

  //validasyonda sorun var
  async function metaDataValidaditon() {
    const { error, value } = await validatationSchema[
      template as keyof typeof validatationSchema
    ].validate(meta);
    // @DESC error sınıfınla ilgili sorun var düzelt
    if (error) throw new BadRequestError('template validation error');

    return value;
  }

  async function final() {
    const template = await loadingTemplate();
    // const data = await metaDataValidaditon();
    const html = template(meta);
    return html;
  }

  return final();
}
