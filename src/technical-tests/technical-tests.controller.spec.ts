import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalTestsController } from './technical-tests.controller';
import { TechnicalTestsService } from './technical-tests.service';

describe('TechnicalTestsController', () => {
  let controller: TechnicalTestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnicalTestsController],
      providers: [TechnicalTestsService],
    }).compile();

    controller = module.get<TechnicalTestsController>(TechnicalTestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
