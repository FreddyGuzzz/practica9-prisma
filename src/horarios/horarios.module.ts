import { Module } from '@nestjs/common';
import { HorarioPrismaRepository } from './horario-prisma.repository';
import { HorarioRepository } from './horario.repository';
import { HorariosController } from './horarios.controller';
import { HorariosService } from './horarios.service';

@Module({
  controllers: [HorariosController],
  providers: [
    HorariosService,
    { provide: HorarioRepository, useClass: HorarioPrismaRepository },
  ],
})
export class HorariosModule {}
