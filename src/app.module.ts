import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PruebaModule } from './prueba/prueba.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      database: 'testdb',
      autoLoadEntities: true, // CARGA AUTOMATICAMENTE LAS ENTIDADES QUE SE VAYAN DEFINIENDO //
      synchronize: true, //! NO SE USA EN PRODUCCION !//
    }),
    PruebaModule,
  ],
})
export class AppModule {}
