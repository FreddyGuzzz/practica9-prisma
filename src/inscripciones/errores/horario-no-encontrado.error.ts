import { ErrorDominio } from '../../common/errores/error-dominio';

export class HorarioNoEncontradoError extends ErrorDominio {
  constructor(id: number) {
    super(`No existe el horario con id ${id}`);
  }
}
