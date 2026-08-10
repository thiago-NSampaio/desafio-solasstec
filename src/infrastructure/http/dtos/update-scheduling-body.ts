import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateSchedulingBody {
  @IsOptional()
  @IsDateString({}, { message: 'A data agendada deve ser uma data válida.' })
  dateScheduled?: string;

  @IsOptional()
  @IsString({ message: 'O ID da sala deve ser um texto.' })
  roomId?: string;
}
