import { NicheRepository } from '../../domain/repositories/NicheRepository';

interface CreateNicheRequest {
    key: string;
    name: string;
}

export class CreateNiche {
  constructor(private nicheRepository: NicheRepository) {}

  async execute(request: CreateNicheRequest) {
    const { key, name } = request;
    
    const niche = {
                key,
                name,
              };
    return await this.nicheRepository.create(niche);
  }
}
