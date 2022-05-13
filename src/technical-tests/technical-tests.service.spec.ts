import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalTestsService } from './technical-tests.service';

describe('TechnicalTestsService', () => {
  let service: TechnicalTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnicalTestsService],
    }).compile();

    service = module.get<TechnicalTestsService>(TechnicalTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
