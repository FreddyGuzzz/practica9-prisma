import { ErrorDominio } from '../../common/errores/error-dominio';

export class MiembroNoEncontradoError extends ErrorDominio {
  constructor(id: number) {
    super(`No existe el miembro con id ${id}`);
  }
}
