import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHolidayBody {
  @IsNotEmpty({ message: 'A data do feriado é obrigatória.' })
  @IsDateString()
  date!: Date;

  @IsNotEmpty({ message: 'A descrição do feriado é obrigatória.' })
  @IsString()
  description!: string;

  @IsOptional()
  @IsInt()
  type?: number;
}
