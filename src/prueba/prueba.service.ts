import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { UpdatePruebaDto } from './dto/update-prueba.dto';
import { Prueba } from './entities/prueba.entity';

@Injectable()
export class PruebaService {

  private readonly logger = new Logger('PruebaService')

  constructor(
    @InjectRepository(Prueba)
    private readonly pruebaRepository: Repository<Prueba>,
  ){}

  /*--------------------------
      CREATE PRUEBA FUCTION
  ----------------------------*/
  async create(createPruebaDto: CreatePruebaDto) {
    
    try {

      const prueba = this.pruebaRepository.create(createPruebaDto);

      await this.pruebaRepository.save(prueba);

      return prueba;

    } catch (error) {

      this.logger.error(error);
      
      throw new BadRequestException(error.detail);

    }

  }

  /*-----------------------------
      FIND ALL PRUEBA FUNCTION
  -------------------------------*/
  async findAll() {
    return await this.pruebaRepository.find({});
  }

  /*-------------------------------
      FIND PRUEBA BY ID FUNCTION
  ---------------------------------*/
  async findOne(id: any) {

    const prueba = this.pruebaRepository.findOne(id);

    if(!prueba){
      throw new NotFoundException(`La prueba con el id: ${id} no fue encontrada`);
    }

    return prueba;

  }

  /*---------------------------
      UPDATE PRUEBA FUNCTION
  -----------------------------*/
  async update(id: string, updatePruebaDto: UpdatePruebaDto) {

    const prueba = await this.pruebaRepository.preload({
      _id:id,
      ...updatePruebaDto
    })

    if(!prueba){
      throw new NotFoundException(`La prueba con el id: ${id} no fue encontrada`);
    }

    return this.pruebaRepository.save(prueba);
    
  }

  /*---------------------------
      REMOVE PRUEBA FUNCTION
  -----------------------------*/
  async remove(id: string) {
    
    const prueba = await this.findOne(id);

    if(prueba){
      return await this.pruebaRepository.remove(prueba);
    }

    throw new NotFoundException(`La prueba con el id: ${id} no fue encontrada`);

  }

}
