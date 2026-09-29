import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CrearClaseDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsInt()
  @Min(1)
  duracionMinutos: number;
}
