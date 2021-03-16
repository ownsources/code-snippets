export class UserAccountMapper {
    public static fromPersistanceToDomain(persistanceEntity: UserAccountEntity): UserAccountDomainEntity {
        const domainEntity = new UserAccountDomainEntity();

        domainEntity.id = persistanceEntity.id;
        domainEntity.email = persistanceEntity.email;
        domainEntity.unverifiedEmail = persistanceEntity.unverifiedEmail;
        domainEntity.password = persistanceEntity.password;
        domainEntity.googleEmail = persistanceEntity.googleEmail;
        domainEntity.appleEmail = persistanceEntity.appleEmail;
        domainEntity.facebookEmail = persistanceEntity.facebookEmail;
        domainEntity.phoneNumber = persistanceEntity.phoneNumber;
        domainEntity.unverifiedPhoneNumber = persistanceEntity.unverifiedPhoneNumber;
        domainEntity.role = persistanceEntity.role;

        return domainEntity;
    }

    public static fromDomainToPersistance(domainEntity: UserAccountDomainEntity): UserAccountEntity {
        const persistanceEntity = new UserAccountEntity();

        persistanceEntity.id = domainEntity.id;
        persistanceEntity.email = domainEntity.email;
        persistanceEntity.unverifiedEmail = domainEntity.unverifiedEmail;
        persistanceEntity.password = domainEntity.password;
        persistanceEntity.googleEmail = domainEntity.googleEmail;
        persistanceEntity.appleEmail = domainEntity.appleEmail;
        persistanceEntity.facebookEmail = domainEntity.facebookEmail;
        persistanceEntity.phoneNumber = domainEntity.phoneNumber;
        persistanceEntity.unverifiedPhoneNumber = domainEntity.unverifiedPhoneNumber;
        persistanceEntity.role = domainEntity.role;

        return persistanceEntity;
    }
}