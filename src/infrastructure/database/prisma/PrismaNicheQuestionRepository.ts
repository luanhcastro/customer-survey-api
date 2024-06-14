import { PrismaClient } from '@prisma/client';
import { NicheQuestionRepository } from '../../../domain/repositories/NicheQuestionRepository';
import { NicheQuestion } from '../../../domain/entities/NicheQuestion';

const prisma = new PrismaClient();

export class PrismaNicheQuestionRepository implements NicheQuestionRepository {
  async findById(id: string): Promise<NicheQuestion | null> {
    return await prisma.nicheQuestion.findUnique({
      where: { id },
    });
  }

  async findManyByNiche(nicheId: string): Promise<NicheQuestion[] | null> {
    return await prisma.nicheQuestion.findMany({
      where: {
        niches: {
          has: nicheId,
        },
      },
    });
  }

  async create(nicheQuestion: NicheQuestion): Promise<void> {
    await prisma.nicheQuestion.create({
      data: nicheQuestion,
    });
  }

  async update(nicheQuestion: NicheQuestion): Promise<void> {
    await prisma.nicheQuestion.update({
      where: { id: nicheQuestion.id },
      data: nicheQuestion,
    });
  }
}