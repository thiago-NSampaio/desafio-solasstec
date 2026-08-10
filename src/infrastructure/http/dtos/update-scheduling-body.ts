import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateSchedulingBody {
  @IsString({ message: 'O ID do visitante deve ser um texto.' })
  visitorId?: string;

  @IsOptional()
  @IsDateString({}, { message: 'A data agendada deve ser uma data válida.' })
  dateScheduled?: string;

  @IsOptional()
  @IsString({ message: 'O ID da sala deve ser um texto.' })
  roomId?: string;
}
