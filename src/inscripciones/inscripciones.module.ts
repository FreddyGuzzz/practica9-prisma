import { Module } from '@nestjs/common';
import { InscripcionPrismaRepository } from './inscripcion-prisma.repository';
import { InscripcionRepository } from './inscripcion.repository';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';

@Module({
  controllers: [InscripcionesController],
  providers: [
    InscripcionesService,
    { provide: InscripcionRepository, useClass: InscripcionPrismaRepository },
  ],
})
export class InscripcionesModule {}
