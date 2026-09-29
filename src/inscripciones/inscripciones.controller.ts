import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import { InscripcionesService } from './inscripciones.service';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private service: InscripcionesService) {}

  @Post()
  async crear(
    @Body() dto: CrearInscripcionDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const inscripcion = await this.service.crear(dto);
    res.setHeader('Location', `/inscripciones/${inscripcion.id}`);
    return inscripcion;
  }

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.service.obtener(id);
  }

  @Delete(':id')
  @HttpCode(204)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.service.eliminar(id);
  }
}
