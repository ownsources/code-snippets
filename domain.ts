export class DriverVerificationsDomainEntity {
    public id: number;
    public email: ShortPeriodVerificationStatus = ShortPeriodVerificationStatus.unverified;
    public phone: ShortPeriodVerificationStatus = ShortPeriodVerificationStatus.unverified;
    public license: LongPeriodVerificationStatus = LongPeriodVerificationStatus.unverified;
    public payoutAccount: LongPeriodVerificationStatus = LongPeriodVerificationStatus.unverified;
    public payoutAccountVerificationErrors: string[] = [];

    get isAccountVerified(): boolean {
        return (
            this.email === ShortPeriodVerificationStatus.verified 
            && this.phone === ShortPeriodVerificationStatus.verified 
            && this.license === LongPeriodVerificationStatus.verified 
            && this.payoutAccount === LongPeriodVerificationStatus.verified
        );
    }

    public verifyEmail(): void {
        this.email = ShortPeriodVerificationStatus.verified;
    }

    public unverifyEmail(): void {
        this.email = ShortPeriodVerificationStatus.unverified;
    }

    public verifyPhone(): void {
        this.phone = ShortPeriodVerificationStatus.verified;
    }

    public unverifyPhone(): void {
        this.phone = ShortPeriodVerificationStatus.unverified;
    }

    public startLicenseVerification(): void {
        this.license = LongPeriodVerificationStatus.pending;
    }

    public verifyLicense(): void {
        if (this.license != LongPeriodVerificationStatus.pending) 
            throw new WrongPreviousLicenseStatusDomainException();

        this.license = LongPeriodVerificationStatus.verified;
    }

    public unverifyLicense(): void {
        this.license = LongPeriodVerificationStatus.unverified;
    }

    public startPayoutAccountVerification(): void {
        this.payoutAccount = LongPeriodVerificationStatus.pending;
    }

    public verifyPayoutAccount(): void {
        if (this.payoutAccount != LongPeriodVerificationStatus.pending)
            throw new WrongPreviousPayoutAccountStatusDomainException();

        this.payoutAccount = LongPeriodVerificationStatus.verified;
    }

    public unverifyPayoutAccount(): void {
        this.payoutAccount = LongPeriodVerificationStatus.unverified;
    }

    public changePayoutAccountVerificationErrors(newErrors: string[]): void {
        this.payoutAccountVerificationErrors = newErrors;
    }

    public deletePayoutAccountVerificationErrors(): void {
        this.payoutAccountVerificationErrors = [];
    }
}