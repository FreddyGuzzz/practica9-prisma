import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearMiembroDto } from './dto/crear-miembro.dto';
import { Miembro } from './miembro.entity';
import { MiembroRepository } from './miembro.repository';

@Injectable()
export class MiembrosService {
  constructor(private repo: MiembroRepository) {}

  crear(dto: CrearMiembroDto): Promise<Miembro> {
    return this.repo.crear(dto);
  }

  listar(): Promise<Miembro[]> {
    return this.repo.buscarTodos();
  }

  async obtener(id: number): Promise<Miembro> {
    const miembro = await this.repo.buscarPorId(id);
    if (!miembro) {
      throw new NotFoundException(`No existe el miembro con id ${id}`);
    }
    return miembro;
  }

  async actualizar(id: number, dto: CrearMiembroDto): Promise<Miembro> {
    await this.obtener(id);
    return this.repo.actualizar(id, dto);
  }

  async eliminar(id: number): Promise<void> {
    await this.obtener(id);
    await this.repo.eliminar(id);
  }
}
