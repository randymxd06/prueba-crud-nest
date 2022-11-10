import { Module } from '@nestjs/common';
import { PruebaService } from './prueba.service';
import { PruebaController } from './prueba.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prueba } from './entities/prueba.entity';

@Module({
  controllers: [PruebaController],
  providers: [PruebaService],
  imports: [
    TypeOrmModule.forFeature([
      Prueba
    ])
  ],
})
export class PruebaModule {}
