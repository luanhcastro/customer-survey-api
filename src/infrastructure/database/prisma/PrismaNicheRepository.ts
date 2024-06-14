import { PrismaClient } from '@prisma/client';
import { NicheRepository } from '../../../domain/repositories/NicheRepository';
import { Niche } from '../../../domain/entities/Niche';

const prisma = new PrismaClient();

export class PrismaNicheRepository implements NicheRepository {
  async findById(id: string): Promise<Niche | null> {
    return await prisma.niche.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Niche[] | null> {
    return await prisma.niche.findMany({});
  }

  async create(niche: Niche): Promise<void> {
    await prisma.niche.create({
      data: niche,
    });
  }

  async update(niche: Niche): Promise<void> {
    await prisma.niche.update({
      where: { id: niche.id },
      data: niche,
    });
  }
}