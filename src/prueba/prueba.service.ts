import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
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

      return {
        data: prueba,
        message: "La prueba fue creada correctamente"
      };

    } catch (error) {

      this.logger.error(error);
      
      throw new BadRequestException(error.message, error.detail);

    }

  }

  /*-----------------------------
      FIND ALL PRUEBA FUNCTION
  -------------------------------*/
  async findAll() {

    const pruebas =  await this.pruebaRepository.find({})

    if(pruebas.length != 0){

      return {
        data: pruebas,
        message: "Pruebas encontradas correctamente"
      }

    } else {

      throw new NotFoundException("No existen pruebas en la base de datos");

    }

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

    try {
      
      const prueba = await (this.pruebaRepository.update(id, updatePruebaDto));
  
      if(prueba.raw.matchedCount == 1){
  
        return {
          data: updatePruebaDto, 
          message: "Datos actualizados correctamente"
        };
        
      } else {
        
        throw new NotFoundException(`La prueba con el id: ${id} no fue encontrada`);
  
      }

    } catch (error) {

      this.logger.error(error);

      throw new BadRequestException(error.message, error.detail);

    }

  }

  /*---------------------------
      REMOVE PRUEBA FUNCTION
  -----------------------------*/
  async remove(id: string) {
    
    const prueba = await this.findOne(id);

    if(prueba){
      return {
        data: await this.pruebaRepository.remove(prueba),
        message: "Prueba eliminada correctamente"
      }
    }

    throw new NotFoundException(`La prueba con el id: ${id} no fue encontrada`);

  }

}
