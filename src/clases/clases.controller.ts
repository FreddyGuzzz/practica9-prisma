import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ClasesService } from './clases.service';
import { CrearClaseDto } from './dto/crear-clase.dto';

@Controller('clases')
export class ClasesController {
  constructor(private service: ClasesService) {}

  @Post()
  async crear(
    @Body() dto: CrearClaseDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const clase = await this.service.crear(dto);
    res.setHeader('Location', `/clases/${clase.id}`);
    return clase;
  }

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.service.obtener(id);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CrearClaseDto,
  ) {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.service.eliminar(id);
  }
}
