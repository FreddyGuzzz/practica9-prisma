import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import { CupoLlenoError } from './errores/cupo-lleno.error';
import { HorarioNoEncontradoError } from './errores/horario-no-encontrado.error';
import { InscripcionDuplicadaError } from './errores/inscripcion-duplicada.error';
import { MiembroNoEncontradoError } from './errores/miembro-no-encontrado.error';
import { Inscripcion } from './inscripcion.entity';
import { InscripcionRepository } from './inscripcion.repository';

@Injectable()
export class InscripcionesService {
  constructor(private repo: InscripcionRepository) {}

  async crear(dto: CrearInscripcionDto): Promise<Inscripcion> {
    const horario = await this.repo.buscarHorario(dto.horarioId);
    if (!horario) {
      throw new HorarioNoEncontradoError(dto.horarioId);
    }

    const miembro = await this.repo.buscarMiembro(dto.miembroId);
    if (!miembro) {
      throw new MiembroNoEncontradoError(dto.miembroId);
    }

    const inscritos = await this.repo.buscarPorHorario(dto.horarioId);

    const yaInscrito = inscritos.some((i) => i.miembroId === dto.miembroId);
    if (yaInscrito) {
      throw new InscripcionDuplicadaError(dto.miembroId, dto.horarioId);
    }

    if (inscritos.length >= horario.cupoMaximo) {
      throw new CupoLlenoError(dto.horarioId);
    }

    return this.repo.crear(dto);
  }

  listar(): Promise<Inscripcion[]> {
    return this.repo.buscarTodas();
  }

  async obtener(id: number): Promise<Inscripcion> {
    const inscripcion = await this.repo.buscarPorId(id);
    if (!inscripcion) {
      throw new NotFoundException(`No existe la inscripcion con id ${id}`);
    }
    return inscripcion;
  }

  async eliminar(id: number): Promise<void> {
    await this.obtener(id);
    await this.repo.eliminar(id);
  }
}
