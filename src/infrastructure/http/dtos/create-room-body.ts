import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Availability } from '../../../app/entities/room';

export class CreateRoomBody {
  @IsNotEmpty({ message: 'O nome da sala é obrigatório.' })
  @IsString({ message: 'O nome da sala deve ser um texto.' })
  name!: string;

  @IsNotEmpty({ message: 'A disponibilidade é obrigatória.' })
  @IsArray({ message: 'A disponibilidade deve ser uma lista.' })
  availability!: Availability[];

  @IsNotEmpty({ message: 'A capacidade é obrigatória.' })
  @IsInt({ message: 'A capacidade deve ser um número inteiro.' })
  capacity!: number;

  @IsOptional()
  @IsInt({ message: 'A variação de capacidade deve ser um número inteiro.' })
  capacityVariation?: number;

  @IsOptional()
  @IsString({ message: 'O nome do responsável deve ser um texto.' })
  responsibleName?: string;
}
