import { BadRequestException, Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AppealsService } from './appeals.service';

@Controller('appeals')
export class AppealsController {
    constructor(private readonly appealsService: AppealsService) {}

    @Get()
    getActiveAppeals(@Query('search') search?: string) {
        return this.appealsService.findActive(search)
    }

    @Get(':id')
    getAppealById(@Param('id', new ParseIntPipe()) id: number) {
        if (id <= 0 || id > 2147483647) {
            throw new BadRequestException('Id is not valid');
        }
        return this.appealsService.getAppealById(id);
    }
}
