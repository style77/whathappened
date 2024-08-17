import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('keys')
export class Key {
  @PrimaryColumn()
  key: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.keys)
  @JoinColumn()
  user: User;

  // List of allowed domains
  @Column('text', { array: true })
  allowed_domains: string[];
}
