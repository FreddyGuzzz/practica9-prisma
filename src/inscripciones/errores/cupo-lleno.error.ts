import { ErrorDominio } from '../../common/errores/error-dominio';

export class CupoLlenoError extends ErrorDominio {
  constructor(horarioId: number) {
    super(`El horario ${horarioId} ya no tiene cupo`);
  }
}
