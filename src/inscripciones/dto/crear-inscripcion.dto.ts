import { IsInt } from 'class-validator';

export class CrearInscripcionDto {
  @IsInt()
  miembroId: number;

  @IsInt()
  horarioId: number;
}
