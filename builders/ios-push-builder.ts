export class IOSPushBuilder implements PushBuilderType {
    public ApplicationId: string;
    public MessageRequest: Pinpoint.MessageRequest;

    public init() {
        this.MessageRequest = new EmptyPushIOSMessageRequest();

        return this;
    }

    public setAddresses(...addresses: string[]) {
        addresses.forEach(address => {
            this.MessageRequest.Addresses = {
                [address]: {
                    ChannelType: process.env.NODE_ENV === ApplicationEnvType.production ? 'APNS' : 'APNS_SANDBOX',
                },
            };
        });

        return this;
    }

    public setMessage(message: string) {
        this.MessageRequest.MessageConfiguration.APNSMessage = {
            Action: 'OPEN_APP',
            Body: JSON.stringify(message),
            SilentPush: true,
            TimeToLive: 30,
        };

        return this;
    }

    public build(): Pinpoint.SendMessagesRequest {
        return this;
    }
}