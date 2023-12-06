
import { ClientModelServer } from "./client.model";

export interface UserModelServer {
    client: ClientModelServer;
    password: String;
}