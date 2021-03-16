@Entity({ name: 'user_account' })
export class UserAccountEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 300, unique: true, nullable: true })
    email: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    unverifiedEmail: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    unverifiedPhoneNumber: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    password: string;

    @Column({ type: 'varchar', length: 300, unique: true, nullable: true })
    googleEmail: string;

    @Column({ type: 'varchar', length: 300, unique: true, nullable: true })
    facebookEmail: string;

    @Column({ type: 'varchar', length: 300, unique: true, nullable: true })
    appleEmail: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    refreshToken: string;

    @Column({ type: 'enum', enum: UserRoleType, nullable: true })
    role: UserRoleType;

    @OneToOne(
        () => DriverEntity,
        driverEntity => driverEntity.userAccount,
    )
    driver: DriverEntity;
}