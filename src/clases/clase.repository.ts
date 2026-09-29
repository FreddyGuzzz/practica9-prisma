import { Clase } from './clase.entity';
import { CrearClaseDto } from './dto/crear-clase.dto';

export abstract class ClaseRepository {
  abstract crear(dto: CrearClaseDto): Promise<Clase>;
  abstract buscarTodas(): Promise<Clase[]>;
  abstract buscarPorId(id: number): Promise<Clase | null>;
  abstract actualizar(id: number, dto: CrearClaseDto): Promise<Clase>;
  abstract eliminar(id: number): Promise<void>;
}
