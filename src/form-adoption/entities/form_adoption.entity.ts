
import { Animal } from "src/animals/entities/animal.entity";
import { User } from "src/auth/entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('formAdoption')
export class formAdoption {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text', {
    })
    identification: string;

    @Column('text')
    birthdate: string;

    @Column('text', {
    })
    reasonadoption: string;

    @Column('text', {
    })
    interviewdate: string;

    @ManyToOne(
        () => Animal,
        ( animal ) => animal.form,
        {  onDelete: 'CASCADE' }
    )
    animal: Animal

    @ManyToOne(
        () => User,
        ( user ) => user.form,
        {  onDelete: 'CASCADE' }
    )
    user: User
    
    

}