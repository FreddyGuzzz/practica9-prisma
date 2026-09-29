import { Injectable, NotFoundException } from '@nestjs/common';
import { Clase } from './clase.entity';
import { ClaseRepository } from './clase.repository';
import { CrearClaseDto } from './dto/crear-clase.dto';

@Injectable()
export class ClasesService {
  constructor(private repo: ClaseRepository) {}

  crear(dto: CrearClaseDto): Promise<Clase> {
    return this.repo.crear(dto);
  }

  listar(): Promise<Clase[]> {
    return this.repo.buscarTodas();
  }

  async obtener(id: number): Promise<Clase> {
    const clase = await this.repo.buscarPorId(id);
    if (!clase) {
      throw new NotFoundException(`No existe la clase con id ${id}`);
    }
    return clase;
  }

  async actualizar(id: number, dto: CrearClaseDto): Promise<Clase> {
    await this.obtener(id);
    return this.repo.actualizar(id, dto);
  }

  async eliminar(id: number): Promise<void> {
    await this.obtener(id);
    await this.repo.eliminar(id);
  }
}
