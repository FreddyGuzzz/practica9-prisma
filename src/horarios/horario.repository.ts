import { CrearHorarioDto } from './dto/crear-horario.dto';
import { Horario } from './horario.entity';

export abstract class HorarioRepository {
  abstract crear(dto: CrearHorarioDto): Promise<Horario>;
  abstract buscarTodos(): Promise<Horario[]>;
  abstract buscarPorId(id: number): Promise<Horario | null>;
  abstract actualizar(id: number, dto: CrearHorarioDto): Promise<Horario>;
  abstract eliminar(id: number): Promise<void>;
}
