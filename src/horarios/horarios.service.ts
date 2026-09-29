import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearHorarioDto } from './dto/crear-horario.dto';
import { Horario } from './horario.entity';
import { HorarioRepository } from './horario.repository';

@Injectable()
export class HorariosService {
  constructor(private repo: HorarioRepository) {}

  crear(dto: CrearHorarioDto): Promise<Horario> {
    return this.repo.crear(dto);
  }

  listar(): Promise<Horario[]> {
    return this.repo.buscarTodos();
  }

  async obtener(id: number): Promise<Horario> {
    const horario = await this.repo.buscarPorId(id);
    if (!horario) {
      throw new NotFoundException(`No existe el horario con id ${id}`);
    }
    return horario;
  }

  async actualizar(id: number, dto: CrearHorarioDto): Promise<Horario> {
    await this.obtener(id);
    return this.repo.actualizar(id, dto);
  }

  async eliminar(id: number): Promise<void> {
    await this.obtener(id);
    await this.repo.eliminar(id);
  }
}
