export class ExampleTemplate implements AbstractTemplate {
    public buildEmail(data: ExampleTemplateDomainData): Pinpoint.SendMessagesRequest {
        return new EmailBuilder()
            .init()
            .setAddresses(data.receiver.email)
            .setTemplateVariables(EmailTemplateName.ExampleTemplate, createExampleTemplateVariables(data))
            .build();
    }

    public buildSms(data: ExampleTemplateDomainData): Pinpoint.SendMessagesRequest {
        return new SmsBuilder()
            .init()
            .setAddresses(data.receiver.phone)
            .setMessage(this.buildMessage(data))
            .build();
    }

    public buildPush(data: ExampleTemplateDomainData): Pinpoint.SendMessagesRequest[] {
        return data.receiver.pushTokens.map(pair => {
            return getPushBuilder(pair.platformType)
                .init()
                .setAddresses(pair.token)
                .setMessage(this.buildMessage(data))
                .build();
        });
    }

    public buildMessage(data: ExampleTemplateDomainData): string {
        return `driver first name is ${data.driver.firstName}`;
    }
}
