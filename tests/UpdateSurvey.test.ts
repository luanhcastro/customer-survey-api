import { UpdateSurvey } from '../src/application/use-cases/UpdateSurvey';
import { SurveyRepository } from '../src/domain/repositories/SurveyRepository';

describe('UpdateSurvey', () => {
  let updateSurvey: UpdateSurvey;
  let mockSurveyRepository: jest.Mocked<SurveyRepository>;

  beforeEach(() => {
    mockSurveyRepository = {
        findById: jest.fn(),
        update: jest.fn(),
    } as unknown as jest.Mocked<SurveyRepository>;

    updateSurvey = new UpdateSurvey(mockSurveyRepository);
  });

  it('should update stars and email fields of an existing survey', async () => {
    const existingSurvey = {
      id: '1',
      nicheId: 'niche1',
      stars: 3,
      email: 'test@example.com',
      nicheAnswers: { question1: 'answer1', question2: 'answer2' },
      created: new Date(),
      updated: new Date(),
      deleted: null,
    };

    mockSurveyRepository.findById.mockResolvedValue(existingSurvey);

    const updatedStars = 4;
    const updatedEmail = 'updated@example.com';

    await updateSurvey.execute({ id: '1', stars: updatedStars, email: updatedEmail });

    expect(mockSurveyRepository.findById).toHaveBeenCalledWith('1');

    expect(existingSurvey.stars).toBe(updatedStars);
    expect(existingSurvey.email).toBe(updatedEmail);
    expect(existingSurvey.updated).toBeInstanceOf(Date);
    expect(mockSurveyRepository.update).toHaveBeenCalledWith(existingSurvey);
  });

  it('should update nicheAnswers field of an existing survey', async () => {
    const existingSurvey = {
      id: '2',
      nicheId: 'niche2',
      stars: 5,
      email: 'another@example.com',
      nicheAnswers: { question1: 'answer1', question2: 'answer2' },
      created: new Date(),
      updated: new Date(),
      deleted: null,
    };

    mockSurveyRepository.findById.mockResolvedValue(existingSurvey);

    const updatedNicheAnswers = { question1: 'updatedAnswer1', question2: 'updatedAnswer2' };

    await updateSurvey.execute({ id: '2', nicheAnswers: updatedNicheAnswers });

    expect(mockSurveyRepository.findById).toHaveBeenCalledWith('2');

    expect(existingSurvey.nicheAnswers).toEqual(updatedNicheAnswers);
    expect(existingSurvey.updated).toBeInstanceOf(Date);
    expect(mockSurveyRepository.update).toHaveBeenCalledWith(existingSurvey);
  });

  it('should throw an error if survey is not found', async () => {
    mockSurveyRepository.findById.mockResolvedValue(null); // Simulate survey not found

    await expect(updateSurvey.execute({ id: '999', stars: 5 })).rejects.toThrow('Survey not found');

    expect(mockSurveyRepository.findById).toHaveBeenCalledWith('999');
    expect(mockSurveyRepository.update).not.toHaveBeenCalled();
  });
});
