import { Injectable } from '@nestjs/common';
import { Horario } from '../horarios/horario.entity';
import { Miembro } from '../miembros/miembro.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import { Inscripcion } from './inscripcion.entity';
import { InscripcionRepository } from './inscripcion.repository';

@Injectable()
export class InscripcionPrismaRepository implements InscripcionRepository {
  constructor(private prisma: PrismaService) {}

  crear(dto: CrearInscripcionDto): Promise<Inscripcion> {
    return this.prisma.inscripcion.create({ data: dto });
  }

  buscarTodas(): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany();
  }

  buscarPorId(id: number): Promise<Inscripcion | null> {
    return this.prisma.inscripcion.findUnique({ where: { id } });
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.inscripcion.delete({ where: { id } });
  }

  buscarPorHorario(horarioId: number): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany({ where: { horarioId } });
  }

  buscarHorario(id: number): Promise<Horario | null> {
    return this.prisma.horario.findUnique({ where: { id } });
  }

  buscarMiembro(id: number): Promise<Miembro | null> {
    return this.prisma.miembro.findUnique({ where: { id } });
  }
}
