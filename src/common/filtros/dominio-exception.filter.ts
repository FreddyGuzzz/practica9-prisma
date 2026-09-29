import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorDominio } from '../errores/error-dominio';
import { CupoLlenoError } from '../../inscripciones/errores/cupo-lleno.error';
import { HorarioNoEncontradoError } from '../../inscripciones/errores/horario-no-encontrado.error';
import { InscripcionDuplicadaError } from '../../inscripciones/errores/inscripcion-duplicada.error';
import { MiembroNoEncontradoError } from '../../inscripciones/errores/miembro-no-encontrado.error';

@Catch(ErrorDominio)
export class DominioExceptionFilter implements ExceptionFilter {
  catch(error: ErrorDominio, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let tipo = 'Internal Server Error';

    if (
      error instanceof HorarioNoEncontradoError ||
      error instanceof MiembroNoEncontradoError
    ) {
      status = HttpStatus.NOT_FOUND;
      tipo = 'Not Found';
    } else if (
      error instanceof CupoLlenoError ||
      error instanceof InscripcionDuplicadaError
    ) {
      status = HttpStatus.CONFLICT;
      tipo = 'Conflict';
    }

    res.status(status).json({
      statusCode: status,
      error: tipo,
      message: error.message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
