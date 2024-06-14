import { Router } from 'express';
import { NicheQuestionController } from '../controllers/NicheQuestionController';
import { PrismaNicheQuestionRepository } from '../../database/prisma/PrismaNicheQuestionRepository';
import { PrismaNicheRepository } from '../../database/prisma/PrismaNicheRepository';
import { CreateNicheQuestion } from '../../../application/use-cases/CreateNicheQuestion';
import { UpdateNicheQuestionNiches } from '../../../application/use-cases/UpdateNicheQuestionNiches';
import { FindManyByNiche } from '../../../application/use-cases/FindManyNicheQuestionsByNiche';

const nicheQuestionRepository = new PrismaNicheQuestionRepository();
const nicheRepository = new PrismaNicheRepository();
const nicheQuestionController = new NicheQuestionController(
  new CreateNicheQuestion(nicheQuestionRepository),
  new UpdateNicheQuestionNiches(nicheQuestionRepository),
  new FindManyByNiche(nicheQuestionRepository, nicheRepository) 
);

const router = Router();

router.post('/', (req, res) => nicheQuestionController.create(req, res));

router.get('/:nicheId', (req, res) => nicheQuestionController.findManyyByNiche(req, res))

router.put('/:id/niches', (req, res) => nicheQuestionController.updateNiches(req, res));

export default router;