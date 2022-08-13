import { UserRole } from '../../types/user/user.type';
import { USER_INPUT_EMAIL_MAX_LENGTH, USER_INPUT_FIRSTNAME_MAX_LENGTH, USER_INPUT_LASTNAME_MAX_LENGTH } from './../../consts';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: USER_INPUT_FIRSTNAME_MAX_LENGTH, nullable: true })
    firstName: string;
  
    @Column({ length: USER_INPUT_LASTNAME_MAX_LENGTH, nullable: true })
    lastName: string;

    @Column({ unique: true, length: USER_INPUT_EMAIL_MAX_LENGTH })
    email: string;

    @Column({ length: 64, nullable: true }) 
    passwordHash: string;

    @Column({ unique: true, nullable: true, default: null })
    refreshTokenHash: string;

    @Column({ length: 64, nullable: true })
    verificationToken: string;

    @Column({ type: 'int', precision: 2 })
    role: UserRole;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date


}
