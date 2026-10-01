import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CloseAppealDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  outcome!: string
}
