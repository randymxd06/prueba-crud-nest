import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Prueba {

    @ObjectIdColumn()
    _id: string;

    @Column('varchar', {unique: true})
    email: string;

    @Column('varchar')
    nombre: string;

}
