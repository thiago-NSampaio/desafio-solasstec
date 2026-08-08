import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSchedulingBody {
  @IsNotEmpty({ message: 'O ID do visitante é obrigatório.' })
  visitorId!: string;

  @IsNotEmpty({ message: 'A data do agendamento é obrigatória.' })
  @IsDateString()
  dateScheduled!: Date;

  @IsOptional()
  roomId?: string;
}
