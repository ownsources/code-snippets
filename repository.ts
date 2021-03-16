@EntityRepository(DriverEntity)
export class DriverRepository extends BaseRepository<DriverEntity> {
    private get driverQueryBuilder(): SelectQueryBuilder<DriverEntity> {
        return this.createQueryBuilder('driver')
            .leftJoinAndSelect('driver.userAccount', 'userAccount')
            .leftJoinAndSelect('driver.notifications', 'notifications')
            .leftJoinAndSelect('driver.verifications', 'verifications')
            .leftJoinAndSelect('driver.connectAccount', 'connectAccount')
            .leftJoinAndSelect('connectAccount.bankAccount', 'bankAccount')
            .leftJoinAndSelect('driver.avatar', 'avatar');
    }


    public async findOneByUserAccountId(id: number): Promise<Driver> {
        const driver = await this.driverQueryBuilder.where('userAccount.id = (:id)', { id }).getOne();
        if (!driver) {
            throw new DriverNotFoundException();
        }

        return DriverMapper.fromEntityToDomain(driver);
    }

    public async saveDomain(domain: Driver): Promise<Driver> {
        const savedEntity = await this.save(DriverMapper.fromDomainToEntity(domain));

        return DriverMapper.fromEntityToDomain(savedEntity);
    }
}