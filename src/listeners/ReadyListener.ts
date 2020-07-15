import { Listener } from "discord-akairo";

export default class ReadyListener extends Listener {
    public constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        })
    }
    public exec(): void {
        console.log(`logged in as ${this.client.user.tag} (${this.client.user.id})`)
    }
} 