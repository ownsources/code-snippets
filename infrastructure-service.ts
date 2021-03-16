export class InMemoryStorageCollectionService {
    private readonly ioClient: Client.Redis;

    constructor(private readonly redisService: RedisService) {
        this.ioClient = this.redisService.getClient();
    }

    public async addToCollection(collection: string, key: string, value: string): Promise<string> {
        await this.ioClient.hmset(collection, key, value);
        return key;
    }

    public async getManyFromCollection(collection: string, keys: string[]): Promise<string[]> {
        return this.ioClient.hmget(collection, keys);
    }

    public async getOneFromCollection(collection: string, key: string): Promise<string> {
        return this.ioClient.hmget(collection, key).then(result => result[0]);
    }

    public async deleteFromCollection(collection: string, key: string): Promise<void> {
        await this.ioClient.hdel(collection, key);
    }

    public async deleteManyFromCollection(collection: string, keys: string[]): Promise<void> {
        await this.ioClient.hdel(collection, keys);
    }

    public async withdrawValueFromCollection(collection: string, key: string): Promise<string> {
        const valueFromRedis = await this.getOneFromCollection(collection, key);

        if (!valueFromRedis) {
            throw new KeyNotFoundException();
        }

        await this.deleteFromCollection(collection, key);

        return valueFromRedis;
    }
}
