import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
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

      // CREAR INSTANCIA DE PRUEBA //
      const prueba = this.pruebaRepository.create(createPruebaDto);

      // GUARDAR LA PRUEBA //
      await this.pruebaRepository.save(prueba);

      // RETORNO LA PRUEBA //
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
  async findOne(_id: string) {

    const prueba = await this.pruebaRepository.findOneBy({_id})
    
    if(!prueba){
      throw new NotFoundException(`La prueba con el id: ${_id} no fue encontrada`);
    }

    return prueba;

  }

  update(id: number, updatePruebaDto: UpdatePruebaDto) {
    return `This action updates a #${id} prueba`;
  }

  remove(id: number) {
    return `This action removes a #${id} prueba`;
  }
}
