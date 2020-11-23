import { Socket } from "net";

import { LightBulbCommand } from "./commands";

async function connectDevice(address: string, port: number): Promise<Socket> {
  return new Promise((resolve, reject) => {
    try {
      const socket = new Socket();

      socket.connect({ host: address, port }, () => {
        resolve(socket);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function createLightBulb(address: string) {
  const socket = await connectDevice(address, 55443);

  let id = 1;

  const sendCommand = async (command: LightBulbCommand) => {
    return new Promise((resolve, reject) => {
      const commandString = `${JSON.stringify({ id, ...command })}\r\n`;
      id = id === 1 ? 2 : 1;

      socket.write(commandString, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(command);
        }
      });
    });
  };

  const closeConnection = () => {
    socket.destroy();
  };

  const onError = (listener: (message: string) => void) => {
    socket.on("data", (data) => {
      try {
        const rows = data.toString("utf8").split("\r\n"),
          error = JSON.parse(rows[0]).error;

        if (error) {
          listener(`Light bulb error: ${error.message}`);
        }
      } catch (err) {}
    });
  };

  return {
    sendCommand,
    close: closeConnection,
    onError,
  };
}
