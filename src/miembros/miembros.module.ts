import { Module } from '@nestjs/common';
import { MiembroPrismaRepository } from './miembro-prisma.repository';
import { MiembroRepository } from './miembro.repository';
import { MiembrosController } from './miembros.controller';
import { MiembrosService } from './miembros.service';

@Module({
  controllers: [MiembrosController],
  providers: [
    MiembrosService,
    { provide: MiembroRepository, useClass: MiembroPrismaRepository },
  ],
})
export class MiembrosModule {}
