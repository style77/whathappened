import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  ua: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  referrer: string;

  @Column('json')
  screen: { width: number; height: number };

  @Column('json')
  viewport: { width: number; height: number };
}
