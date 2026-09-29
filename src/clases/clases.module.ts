import { Module } from '@nestjs/common';
import { ClasePrismaRepository } from './clase-prisma.repository';
import { ClaseRepository } from './clase.repository';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';

@Module({
  controllers: [ClasesController],
  providers: [
    ClasesService,
    { provide: ClaseRepository, useClass: ClasePrismaRepository },
  ],
})
export class ClasesModule {}
