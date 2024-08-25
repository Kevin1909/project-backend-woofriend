import { User } from "src/auth/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('profiles')
export class Profile {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: true
    })
    firstcontent: string;

    @Column('text', {
        nullable: true
    })
    secondcontent: string;

    @Column('text', {
        nullable: true
    })
    thirdcontent: string;

    @Column('text', {
        nullable: true
    })
    photo: string;


    
    @OneToOne(
        () => User,
        ( user ) => user.profile,
        {  onDelete: 'CASCADE' }
    )
    @JoinColumn()
    user: User
    
}
