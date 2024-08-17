import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Error } from './error.entity';
import { Session } from './session.entity';

@Entity('session_errors')
export class SessionError {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Session, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @ManyToOne(() => Error, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'error_id' })
  error: Error;

  @Column('json', { nullable: true })
  mouseMovements: { x: number; y: number; timestamp: number }[];

  @Column('json', { nullable: true })
  interactions: { eventType: string; eventData: any; timestamp: number }[];

  @Column('timestamp')
  startedAt: Date;

  @Column('timestamp')
  endedAt: Date;

  @Column()
  duration: number;
}
