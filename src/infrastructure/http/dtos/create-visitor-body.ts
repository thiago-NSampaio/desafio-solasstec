import {
  IsDateString,
  IsInt,
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
  @IsDateString(
    {},
    { message: 'A data deve estar no formato ISO (YYYY-MM-DD)' },
  )
  dateOfBirth!: Date;

  @IsOptional()
  @IsString({ message: 'A foto deve ser uma URL válida.' })
  @MaxLength(255, {
    message: ' O link da foto deve ter no máximo 255 caracteres.',
  })
  photo?: string;

  @IsOptional()
  @IsInt({ message: 'O nível de prioridade deve ser um número inteiro.' })
  priorityLevelId?: number;
}
