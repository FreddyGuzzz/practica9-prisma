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
import { CrearMiembroDto } from './dto/crear-miembro.dto';
import { MiembrosService } from './miembros.service';

@Controller('miembros')
export class MiembrosController {
  constructor(private service: MiembrosService) {}

  @Post()
  async crear(
    @Body() dto: CrearMiembroDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const miembro = await this.service.crear(dto);
    res.setHeader('Location', `/miembros/${miembro.id}`);
    return miembro;
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
    @Body() dto: CrearMiembroDto,
  ) {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.service.eliminar(id);
  }
}
