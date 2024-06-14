import { Niche } from '../entities/Niche';

export interface NicheRepository {
  findById(id: string): Promise<Niche | null>;
  findAll(): Promise<Niche[] | null>;
  create(niche: Niche): Promise<void>;
  update(niche: Niche): Promise<void>;
}
