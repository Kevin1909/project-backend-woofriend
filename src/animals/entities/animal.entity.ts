

import { User } from "src/auth/entities";
import { formAdoption } from "src/form-adoption/entities/form_adoption.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('animals')
export class Animal {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('text')    
    typeanimal: string;

    @Column('text')
    name: string;

    @Column('text')
    birthdate: string; 

    @Column('text')
    race: string;

    @Column('text', {
    })
    characteristics: string;

    @Column('text', {
        nullable: true
    })
    vaccinationrecord: string;


    @Column('text', {
        nullable: true
    })
    pathologiesdisabilities: string;

    @Column('text', {
        nullable: true
    })
    photo: string;

    

    @OneToMany(
        () => formAdoption,
        (formadoption) => formadoption.animal,
        { cascade: true, }
    )
    form?: formAdoption;

    @ManyToOne(
        () => User,
        ( user ) => user.animal,
        {  onDelete: 'CASCADE', eager: true }
    )
    user: User
    

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.race = this.race.toLowerCase().trim();
        this.typeanimal = this.typeanimal.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }
}
