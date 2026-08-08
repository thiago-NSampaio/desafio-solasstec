import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSchedulingBody {
  @IsNotEmpty({ message: 'O ID do visitante é obrigatório.' })
  @IsInt({ message: 'O ID do visitante deve ser um número inteiro.' })
  visitorId!: number;

  @IsNotEmpty({ message: 'A data do agendamento é obrigatória.' })
  @IsDateString()
  dateScheduled!: Date;

  @IsOptional()
  @IsInt({ message: 'O ID da sala deve ser um número inteiro.' })
  roomId?: number;
}
