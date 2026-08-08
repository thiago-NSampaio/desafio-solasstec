import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEntryBody {
  @IsNotEmpty({ message: 'O ID do visitante é obrigatório.' })
  visitorId!: string;

  @IsOptional()
  roomId?: string;

  @IsOptional()
  schedulingId?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'A data de entrada deve estar no formato ISO (YYYY-MM-DD).' },
  )
  enteredAt?: Date;
}
