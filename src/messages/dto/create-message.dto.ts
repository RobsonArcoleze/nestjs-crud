import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Person } from 'src/person/entities/person.entity';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  text: string;

  @IsNotEmpty()
  from: Person;

  @IsNotEmpty()
  to: Person;
}
