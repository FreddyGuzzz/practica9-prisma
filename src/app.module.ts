import { Module } from '@nestjs/common';
import { ClasesModule } from './clases/clases.module';
import { HorariosModule } from './horarios/horarios.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { MiembrosModule } from './miembros/miembros.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ClasesModule,
    HorariosModule,
    MiembrosModule,
    InscripcionesModule,
  ],
})
export class AppModule {}
