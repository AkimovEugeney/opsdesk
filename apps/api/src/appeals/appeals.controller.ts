import { Controller, Get } from '@nestjs/common';
import { AppealsService } from './appeals.service';

@Controller('appeals')
export class AppealsController {
    constructor(private readonly appealsService: AppealsService) {}

    @Get()
    getActiveAppeals() {
        return this.appealsService.findActive()
    }
}
