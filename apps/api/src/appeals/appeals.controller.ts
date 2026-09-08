import { Controller, Get, Param } from '@nestjs/common';
import { AppealsService } from './appeals.service';

@Controller('appeals')
export class AppealsController {
    constructor(private readonly appealsService: AppealsService) {}

    @Get()
    getActiveAppeals() {
        return this.appealsService.findActive()
    }

    @Get(':id')
    getAppealById(@Param('id') id: string) {
        return this.appealsService.getAppealById(id);
    }
}
