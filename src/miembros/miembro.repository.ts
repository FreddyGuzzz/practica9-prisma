import { CrearMiembroDto } from './dto/crear-miembro.dto';
import { Miembro } from './miembro.entity';

export abstract class MiembroRepository {
  abstract crear(dto: CrearMiembroDto): Promise<Miembro>;
  abstract buscarTodos(): Promise<Miembro[]>;
  abstract buscarPorId(id: number): Promise<Miembro | null>;
  abstract actualizar(id: number, dto: CrearMiembroDto): Promise<Miembro>;
  abstract eliminar(id: number): Promise<void>;
}
