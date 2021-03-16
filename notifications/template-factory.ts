@Injectable()
export class TemplateFactory {
    private readonly templates = new Map<NotificationCase, AbstractTemplate>()
        .set(NotificationCase.Example, new ExampleTemplate())
        .set(NotificationCase.DriverPhoneVerification, new DriverPhoneVerificationTemplate())
        .set(NotificationCase.DriverEmailVerification, new DriverEmailVerificationTemplate());

    public createTemplate(type: NotificationCase): AbstractTemplate {
        if (!this.templates.has(type)) {
            throw new Error('template does not exist in factory map');
        }

        return this.templates.get(type);
    }
}