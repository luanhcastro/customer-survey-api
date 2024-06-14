import { Request, Response } from 'express';
import { CreateNicheQuestion } from '../../../application/use-cases/CreateNicheQuestion';
import { FindManyByNiche } from '../../../application/use-cases/FindManyNicheQuestionsByNiche';

export class NicheQuestionController {
  constructor(
    private createNicheQuestion: CreateNicheQuestion,
    private findManyNicheQuestionsByNiche: FindManyByNiche
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      await this.createNicheQuestion.execute(req.body);
      return res.status(201).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
      return res.status(400).send({ error: 'An unexpected error occurred' });
    }
  }

  async findManyyByNiche(req: Request, res: Response): Promise<Response> {
    try {
      const nicheQuestions = await this.findManyNicheQuestionsByNiche.execute(req.params.nicheId);
      return res.status(200).json(nicheQuestions);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
      return res.status(400).send({ error: 'An unexpected error occurred' });
    }
  }
}