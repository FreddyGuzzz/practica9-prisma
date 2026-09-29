import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearMiembroDto } from './dto/crear-miembro.dto';
import { Miembro } from './miembro.entity';
import { MiembroRepository } from './miembro.repository';

@Injectable()
export class MiembroPrismaRepository implements MiembroRepository {
  constructor(private prisma: PrismaService) {}

  crear(dto: CrearMiembroDto): Promise<Miembro> {
    return this.prisma.miembro.create({ data: dto });
  }

  buscarTodos(): Promise<Miembro[]> {
    return this.prisma.miembro.findMany();
  }

  buscarPorId(id: number): Promise<Miembro | null> {
    return this.prisma.miembro.findUnique({ where: { id } });
  }

  actualizar(id: number, dto: CrearMiembroDto): Promise<Miembro> {
    return this.prisma.miembro.update({ where: { id }, data: dto });
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.miembro.delete({ where: { id } });
  }
}
