import { Router } from 'express';
import { NicheQuestionController } from '../controllers/NicheQuestionController';
import { PrismaNicheQuestionRepository } from '../../database/prisma/PrismaNicheQuestionRepository';
import { CreateNicheQuestion } from '../../../application/use-cases/CreateNicheQuestion';
import { UpdateNicheQuestionNiches } from '../../../application/use-cases/UpdateNicheQuestionNiches';

const nicheQuestionRepository = new PrismaNicheQuestionRepository();
const nicheQuestionController = new NicheQuestionController(
  new CreateNicheQuestion(nicheQuestionRepository),
  new UpdateNicheQuestionNiches(nicheQuestionRepository)
);

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Niche Questions
 *   description: Manage niche questions
 */

/**
 * @swagger
 * /niche-questions:
 *   post:
 *     summary: Create a new niche question
 *     tags: [Niche Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               text:
 *                 type: string
 *               label:
 *                 type: string
 *               niches:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - key
 *               - text
 *               - label
 *               - niches
 *     responses:
 *       201:
 *         description: Niche question created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', (req, res) => nicheQuestionController.create(req, res));

/**
 * @swagger
 * /niche-questions/{id}/niches:
 *   put:
 *     summary: Update the niches associated with a niche question
 *     tags: [Niche Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The niche question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               niches:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - niches
 *     responses:
 *       200:
 *         description: Niche question updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Niche question not found
 */
router.put('/:id/niches', (req, res) => nicheQuestionController.updateNiches(req, res));

export default router;