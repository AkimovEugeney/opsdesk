import { Injectable } from "@nestjs/common";
import { AppealsRepository } from "./appeals.repository";

@Injectable()
export class AppealsService {
  constructor(private readonly appealsRepository: AppealsRepository) {}

  async findActive() {
    return this.appealsRepository.findActive();
  }
}
