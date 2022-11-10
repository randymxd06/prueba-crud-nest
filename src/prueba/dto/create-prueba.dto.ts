import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePruebaDto {

    @IsString()
    @MinLength(1)
    email: string;

    @IsString()
    nombre: string;
    
}
