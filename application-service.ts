export class DriverProfileApplicationService {
    constructor(
        private readonly driverRepository: DriverRepository,
        private readonly userAccountRepository: UserAccountRepository,
        private readonly phoneVerificationService: PhoneVerificationService,
        private readonly emailVerificationService: EmailVerificationService,
    ) {}

    public async getProfile(driverId: number): Promise<Driver> {
        return this.driverRepository.findOneByUserAccountId(driverId);
    }

    public async changeFullName(driverId: number, fullNameDto: ChangeFullNameRequestDto): Promise<Driver> {
        const driver = await this.driverRepository.findOneByUserAccountId(driverId);

        driver.changeFullName(fullNameDto.fullName);

        return this.driverRepository.saveDomain(driver);
    }

    public async changeAddress(driverId: number, addressDto: ChangeAddressRequestDto): Promise<Driver> {
        const driver = await this.driverRepository.findOneByUserAccountId(driverId);
        const newAddress = AddressMapper.fromRequestToDomain(addressDto);

        driver.changeAddress(newAddress);

        return this.driverRepository.saveDomain(driver);
    }

    public async changePhoneNumber(driverId: number, phoneNumberDto: ChangePhoneRequestDto): Promise<Driver> {
        const driver = await this.driverRepository.findOneByUserAccountId(driverId);
        driver.changePhone(phoneNumberDto.phone);

        await this.phoneVerificationService.startVerification(phoneNumberDto.phone);

        return this.driverRepository.saveDomain(driver);
    }

    public async changeEmail(driverId: number, emailDto: ChangeEmailRequestDto): Promise<Driver> {
        const driver = await this.driverRepository.findOneByUserAccountId(driverId);
        const user = await this.userAccountRepository.checkUserExistByEmail(emailDto.email);

        if (user) {
            throw new UserAlreadyExistException();
        }

        driver.changeEmail(emailDto.email);
        await this.emailVerificationService.startVerification(emailDto.email);

        return this.driverRepository.saveDomain(driver);
    }

    public async changeNotificationSettings(
        driverId: number,
        notificationsDto: ChangeDriverNotificationsRequestDto,
    ): Promise<Driver> {
        const driver = await this.driverRepository.findOneByUserAccountId(driverId);
        const driverNotificationChanges = DriverNotificationsMapper.fromRequestToDomain(notificationsDto);

        driver.updateNotifications(driverNotificationChanges);

        return this.driverRepository.saveDomain(driver);
    }
}