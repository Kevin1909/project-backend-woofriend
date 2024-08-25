import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { formAdoption } from 'src/form-adoption/entities/form_adoption.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { Publication } from 'src/publications/entities/publication.entity';

import { Animal } from 'src/animals/entities/animal.entity';
import { Profile } from 'src/user-profile/entities/profile.entity';



@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
    })
    password: string;

    @Column('text')
    name: string;

    @Column('text')
    ubication: string;

    @Column('text')
    phone: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
    })
    roles: string[];

    @OneToOne(
        () => Profile,
        ( profile ) => profile.user,
        {cascade: true}
        
    )
    profile?: Profile;

    @OneToMany(
        () => formAdoption,
        ( form ) => form.user,
        {cascade: true}
    )
    form?: formAdoption;

    @OneToMany(
        () => Donation,
        ( donation ) => donation.user,
        {cascade: true}
    )
    donation?: Donation;

    @OneToMany(
        () => Publication,
        ( publication ) => publication.user,
        {cascade: true}
    )
    publication?: Publication;

    @OneToMany(
        () => Animal,
        ( animal ) => animal.user,
        {cascade: true}
    )
    animal?: Animal;
    

    


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
        this.name = this.name.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }



}
