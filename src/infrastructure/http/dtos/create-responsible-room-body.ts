import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateResponsibleRoomBody {
  @IsNotEmpty({ message: 'O nome do responsável é obrigatório.' })
  @IsString()
  name!: string;

  @IsNotEmpty({ message: 'O ID da sala é obrigatório.' })
  @IsString()
  roomId!: string;

  @IsNotEmpty({ message: 'A data de início da vigência é obrigatória.' })
  @IsDateString()
  validFrom!: Date;
}
