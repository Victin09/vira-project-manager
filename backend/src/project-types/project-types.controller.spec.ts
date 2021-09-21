import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTypesController } from './project-types.controller';
import { ProjectTypesService } from './project-types.service';

describe('ProjectTypesController', () => {
  let controller: ProjectTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectTypesController],
      providers: [ProjectTypesService],
    }).compile();

    controller = module.get<ProjectTypesController>(ProjectTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
