import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Error } from './error.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  severity: string;

  @Column('json', { nullable: true })
  steps: {
    timestamp: number;
    type: string;
    selector: string;
    label: string;
    value: string;
    additional: Record<string, any>;
  }[];

  // report video, visualizer
  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @ManyToOne(() => Error, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'error_id' })
  error: Error;
}
