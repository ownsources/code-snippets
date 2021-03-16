@WebSocketGateway()
export class DriverEventEmitter {
    @WebSocketServer()
    private server: Server;

    constructor(private readonly jwtAuthService: AuthJwtService) {}

    public async handleConnection(client: Socket): Promise<void> {
        const { id } = await this.jwtAuthService
            .verifyToken<AccessTokenPayloadType>(client.handshake.query.accessToken as string)
            .catch(() => client.disconnect());

        client.join(id.toString());
    }

    public async handleDisconnect(client: Socket): Promise<void> {
        client.disconnect();
    }

    public async emitDriverVerificationUpdate(driver: Driver): Promise<void> {
        this.server
            .to(driver.id.toString())
            .emit('driverVerificationsUpdated', new DriverVerificationsResponseDto(driver.verifications));
    }
}