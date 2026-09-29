import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Clase } from './clase.entity';
import { ClaseRepository } from './clase.repository';
import { CrearClaseDto } from './dto/crear-clase.dto';

@Injectable()
export class ClasePrismaRepository implements ClaseRepository {
  constructor(private prisma: PrismaService) {}

  crear(dto: CrearClaseDto): Promise<Clase> {
    return this.prisma.clase.create({ data: dto });
  }

  buscarTodas(): Promise<Clase[]> {
    return this.prisma.clase.findMany();
  }

  buscarPorId(id: number): Promise<Clase | null> {
    return this.prisma.clase.findUnique({ where: { id } });
  }

  actualizar(id: number, dto: CrearClaseDto): Promise<Clase> {
    return this.prisma.clase.update({ where: { id }, data: dto });
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.clase.delete({ where: { id } });
  }
}
