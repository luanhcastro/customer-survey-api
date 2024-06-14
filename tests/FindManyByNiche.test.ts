import { FindManyByNiche } from '../src/application/use-cases/FindManyNicheQuestionsByNiche';
import { NicheQuestionRepository } from '../src/domain/repositories/NicheQuestionRepository';
import { NicheRepository } from '../src/domain/repositories/NicheRepository';

describe('FindManyByNiche', () => {
  let findManyByNiche: FindManyByNiche;
  let mockNicheQuestionRepository: jest.Mocked<NicheQuestionRepository>;
  let mockNicheRepository: jest.Mocked<NicheRepository>;

  beforeEach(() => {
    mockNicheQuestionRepository = {
        findManyByNiche: jest.fn(),
    } as unknown as jest.Mocked<NicheQuestionRepository>;

    mockNicheRepository = {
        findById: jest.fn(),
    } as unknown as jest.Mocked<NicheRepository>;

    findManyByNiche = new FindManyByNiche(mockNicheQuestionRepository, mockNicheRepository);
  });

  it('should find many niche questions by niche ID', async () => {
    const nicheId = 'niche1';

    const mockNiche = {
      id: 'niche1',
      key: 'GEEKS',
      name: 'Geeks',
      created: new Date(),
      deleted: null,
    };

    const mockNicheQuestions = [
      { id: 'question1', key: 'question1', label: 'Question 1', niches: ['niche1'], created: new Date() },
      { id: 'question2', key: 'question2', label: 'Question 2', niches: ['niche1'], created: new Date() },
    ];

    mockNicheRepository.findById.mockResolvedValue(mockNiche);
    mockNicheQuestionRepository.findManyByNiche.mockResolvedValue(mockNicheQuestions);

    const result = await findManyByNiche.execute(nicheId);

    expect(mockNicheRepository.findById).toHaveBeenCalledWith(nicheId);
    expect(mockNicheQuestionRepository.findManyByNiche).toHaveBeenCalledWith(nicheId);
    expect(result).toEqual(mockNicheQuestions);
  });

  it('should throw an error if niche is not found', async () => {
    const nicheId = 'nonexistent';

    mockNicheRepository.findById.mockResolvedValue(null);

    await expect(findManyByNiche.execute(nicheId)).rejects.toThrow('Niche not found');

    expect(mockNicheRepository.findById).toHaveBeenCalledWith(nicheId);
    expect(mockNicheQuestionRepository.findManyByNiche).not.toHaveBeenCalled();
  });
});
