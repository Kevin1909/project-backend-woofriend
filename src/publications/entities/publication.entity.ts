import { User } from "src/auth/entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('publications')
export class Publication {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: true
    })
    image: string;

    @Column('text', {
        nullable: true
    })
    reason: string;

    @Column('text', {
        nullable: true
    })
    typedonation: string;

    
    @ManyToOne(
        () => User,
        ( user ) => user.publication,
        {  onDelete: 'CASCADE' }
    )
    user: User
    
}
