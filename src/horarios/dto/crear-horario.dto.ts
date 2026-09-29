import { IsInt, IsString, Matches, Min } from 'class-validator';

export class CrearHorarioDto {
  @IsInt()
  claseId: number;

  @IsString()
  diaSemana: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/)
  horaInicio: string;

  @IsInt()
  @Min(1)
  cupoMaximo: number;
}
