import { CreateNicheQuestion } from '../src/application/use-cases/CreateNicheQuestion';
import { NicheQuestionRepository } from '../src/domain/repositories/NicheQuestionRepository';
import { NicheRepository } from '../src/domain/repositories/NicheRepository';

describe('CreateNicheQuestion', () => {
  let createNicheQuestion: CreateNicheQuestion;
  let mockNicheQuestionRepository: jest.Mocked<NicheQuestionRepository>;
  let mockNicheRepository: jest.Mocked<NicheRepository>;

  beforeEach(() => {
    mockNicheQuestionRepository = {
      create: jest.fn(),
    } as unknown as jest.Mocked<NicheQuestionRepository>;

    mockNicheRepository = {
      findAll: jest.fn().mockResolvedValue([
        { key: 'niche1', name: 'Niche 1', created: new Date(), deleted: null },
        { key: 'niche2', name: 'Niche 2', created: new Date(), deleted: null },
      ]),
    } as unknown as jest.Mocked<NicheRepository>;

    createNicheQuestion = new CreateNicheQuestion(mockNicheQuestionRepository, mockNicheRepository);
  });

  it('should create a new niche question', async () => {
    const request = {
      key: 'TEST_KEY',
      label: 'Test Label',
      niches: ['niche1', 'niche2'],
    };

    await createNicheQuestion.execute(request);

    expect(mockNicheQuestionRepository.create).toHaveBeenCalledWith({
      key: request.key,
      label: request.label,
      niches: request.niches,
      deleted: null,
    });
  });

  it('should throw an error if key is missing', async () => {
    const request = {
      key: '',
      label: 'Test Label',
      niches: ['niche1', 'niche2'],
    };

    await expect(createNicheQuestion.execute(request)).rejects.toThrow('Key is required');
  });

  it('should throw an error if label is missing', async () => {
    const request = {
      key: 'TEST_KEY',
      label: '',
      niches: ['niche1', 'niche2'],
    };

    await expect(createNicheQuestion.execute(request)).rejects.toThrow('Label is required');
  });

  it('should throw an error if niches are missing', async () => {
    const request = {
      key: 'TEST_KEY',
      label: 'Test Label',
      niches: [],
    };

    await expect(createNicheQuestion.execute(request)).rejects.toThrow('At least one niche is required');
  });

  it('should throw an error if any niche does not exist', async () => {
    const request = {
      key: 'TEST_KEY',
      label: 'Test Label',
      niches: ['niche1', 'invalid_niche'],
    };

    await expect(createNicheQuestion.execute(request)).rejects.toThrow('Niche invalid_niche does not exist');
  });
});