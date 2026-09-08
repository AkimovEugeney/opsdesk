import { Injectable, NotFoundException } from "@nestjs/common";
import { AppealsRepository } from "./appeals.repository";

@Injectable()
export class AppealsService {
  constructor(private readonly appealsRepository: AppealsRepository) {}

  async findActive(search?: string) {
    const normalizedSearch = search?.trim() || undefined
    if(normalizedSearch) {
      return this.appealsRepository.findActive(normalizedSearch);
    }
    return this.appealsRepository.findActive();
  }

  async getAppealById(id: number) {
    const appeal = await this.appealsRepository.findById(id);
    if (!appeal) {
      throw new NotFoundException(`Обращение с ID ${id} не найдено`);
    }
    return appeal;
  }
}
