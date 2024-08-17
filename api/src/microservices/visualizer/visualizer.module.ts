import { Module } from '@nestjs/common';
import { VisualizerService } from './visualizer.service';

@Module({
  providers: [VisualizerService]
})
export class VisualizerModule {}
