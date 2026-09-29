import { Horario } from '../horarios/horario.entity';
import { Miembro } from '../miembros/miembro.entity';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import { Inscripcion } from './inscripcion.entity';

export abstract class InscripcionRepository {
  abstract crear(dto: CrearInscripcionDto): Promise<Inscripcion>;
  abstract buscarTodas(): Promise<Inscripcion[]>;
  abstract buscarPorId(id: number): Promise<Inscripcion | null>;
  abstract eliminar(id: number): Promise<void>;
  abstract buscarPorHorario(horarioId: number): Promise<Inscripcion[]>;
  abstract buscarHorario(id: number): Promise<Horario | null>;
  abstract buscarMiembro(id: number): Promise<Miembro | null>;
}
