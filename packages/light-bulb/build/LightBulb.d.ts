import { LightBulbCommand } from "./commands";
export declare function createLightBulb(address: string): Promise<{
    sendCommand: (command: LightBulbCommand) => Promise<unknown>;
    close: () => void;
    onError: (listener: (message: string) => void) => void;
}>;
