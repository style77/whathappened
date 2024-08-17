import {
  Entity,
  PrimaryColumn,
  Column,
  Unique,
  OneToMany,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SessionError } from './session-error.entity';
import { Key } from 'src/keys/entities/key.entity';

@Entity('errors')
@Unique(['message', 'filename', 'lineno', 'colno'])
export class Error {
  @PrimaryColumn()
  id: string;

  @Column()
  message: string;

  @Column()
  filename: string;

  @Column()
  lineno: number;

  @Column()
  colno: number;

  @Column('text')
  errorStack: string;

  @CreateDateColumn()
  firstOccurredAt: Date;

  @UpdateDateColumn()
  lastOccurredAt: Date;

  @BeforeInsert()
  generateErrorId() {
    const errorString = `${this.message}-${this.filename}-${this.lineno}-${this.colno}-${Date.now()}`;
    this.id = Buffer.from(errorString).toString('base64');
  }

  @OneToMany(() => SessionError, (sessionError) => sessionError.error)
  sessionErrors: SessionError[];

  @ManyToOne(() => Key)
  @JoinColumn({ name: 'key_id' })
  key: Key;
}
