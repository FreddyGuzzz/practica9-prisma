import { ErrorDominio } from '../../common/errores/error-dominio';

export class InscripcionDuplicadaError extends ErrorDominio {
  constructor(miembroId: number, horarioId: number) {
    super(`El miembro ${miembroId} ya esta inscrito en el horario ${horarioId}`);
  }
}
