import { User } from "src/auth/entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('donations')
export class Donation {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text', {
        nullable: true
    })
    date: string;

    @Column('text')
    typedonation: string;

   @ManyToOne(
        () => User,
        ( user ) => user.donation,
        {  onDelete: 'CASCADE' }
    )
    user: User
   
}
