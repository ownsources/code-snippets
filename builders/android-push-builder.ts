export class AndroidPushBuilder implements PushBuilderType {
    public ApplicationId: string;
    public MessageRequest: Pinpoint.MessageRequest;

    public init(): this {
        this.MessageRequest = new EmptyPushAndroidRequest();

        return this;
    }

    public setAddresses(...addresses: string[]): this {
        addresses.forEach(address => {
            this.MessageRequest.Addresses = {
                [address]: { ChannelType: 'GCM' },
            };
        });

        return this;
    }

    public setMessage(message: string): this {
        this.MessageRequest.MessageConfiguration.GCMMessage = {
            RawContent: JSON.stringify(message),
        };

        return this;
    }

    public build(): Pinpoint.SendMessagesRequest {
        return this;
    }
}