import { Test, TestingModule } from '@nestjs/testing';
import { VisualizerService } from './visualizer.service';

describe('VisualizerService', () => {
  let service: VisualizerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisualizerService],
    }).compile();

    service = module.get<VisualizerService>(VisualizerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
