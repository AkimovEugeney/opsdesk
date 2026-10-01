import { IsInt, Max, Min } from 'class-validator'

export class AssignOwnerDto {
  @IsInt()
  @Min(1)
  @Max(2147483647)
  ownerId!: number
}