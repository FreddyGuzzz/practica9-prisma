import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearHorarioDto } from './dto/crear-horario.dto';
import { Horario } from './horario.entity';
import { HorarioRepository } from './horario.repository';

@Injectable()
export class HorarioPrismaRepository implements HorarioRepository {
  constructor(private prisma: PrismaService) {}

  crear(dto: CrearHorarioDto): Promise<Horario> {
    return this.prisma.horario.create({ data: dto });
  }

  buscarTodos(): Promise<Horario[]> {
    return this.prisma.horario.findMany();
  }

  buscarPorId(id: number): Promise<Horario | null> {
    return this.prisma.horario.findUnique({ where: { id } });
  }

  actualizar(id: number, dto: CrearHorarioDto): Promise<Horario> {
    return this.prisma.horario.update({ where: { id }, data: dto });
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.horario.delete({ where: { id } });
  }
}
