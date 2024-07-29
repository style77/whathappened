import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Key {
    @PrimaryColumn()
    key: string;

    @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
    updatedAt: Date

    @OneToOne(type => User) 
    @JoinColumn()
    user: User

    // List of allowed domains
    @Column("text", { array: true })
    allowed_domains: string[];
}