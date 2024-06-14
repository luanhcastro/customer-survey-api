import { NicheRepository } from '../../domain/repositories/NicheRepository';

export class ListNiches {
  constructor(private nicheRepository: NicheRepository) {}

  async execute() {
    return await this.nicheRepository.findAll();
  }
}