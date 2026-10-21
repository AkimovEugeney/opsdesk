import { BadRequestException, PipeTransform } from '@nestjs/common'

const MAX_INT32 = 2_147_483_647

export class ValidatePositiveInt32Pipe implements PipeTransform<number, number> {
  constructor(
    private readonly errorMessage: string = 'Value must be a positive 32-bit integer',
  ) {}

  transform(value: number): number {
    if (!Number.isInteger(value) || value <= 0 || value > MAX_INT32) {
      throw new BadRequestException(this.errorMessage)
    }

    return value
  }
}
