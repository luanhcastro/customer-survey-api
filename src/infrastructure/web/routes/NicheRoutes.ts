import { Router } from 'express';
import { NicheController } from '../controllers/NicheController';
import { PrismaNicheRepository } from '../../database/prisma/PrismaNicheRepository';
import { CreateNiche } from '../../../application/use-cases/CreateNiche';
import { ListNiches } from '../../../application/use-cases/ListNiches';

const nicheRepository = new PrismaNicheRepository();

const nicheController = new NicheController(
  new CreateNiche(nicheRepository),
  new ListNiches(nicheRepository)
);

const router = Router();

router.post('/', (req, res) => nicheController.create(req, res));

router.get('/', (req, res) => nicheController.list(req, res));

export default router;