import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateVisitorBody {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser um texto.' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres.' })
  name!: string;

  @IsNotEmpty({ message: 'O documento é obrigatório.' })
  @IsString({ message: 'O documento deve ser um texto.' })
  @MaxLength(50, { message: 'O documento deve ter no máximo 50 caracteres.' })
  document!: string;

  @IsNotEmpty({ message: 'A data de nascimento é obrigatória.' })
  @IsDateString()
  dateOfBirth!: Date;

  @IsOptional()
  @IsString({ message: 'A foto deve ser uma URL.' })
  @MaxLength(255)
  photo?: string;

  @IsOptional()
  @IsString({ message: 'O nível de prioridade deve ser um texto.' })
  priorityLevelId?: string;

  @IsOptional()
  @IsBoolean()
  hasDisability?: boolean;
}
