import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
    updatedAt: Date

    @Column({unique: true})
    email: string;

    @Column()
    hashedPassword: string;
}