import { Socket } from "net";
import { QuotaBalancer } from "@smart-light/balancer";

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
  const sockets = [
    await connectDevice(address, 55443),
    await connectDevice(address, 55443),
    await connectDevice(address, 55443),
  ];

  const socketBalancer = new QuotaBalancer(sockets, {
    timeout: 60000,
    maxAccessCount: 47,
  });

  const sendCommand = async (command: LightBulbCommand) => {
    return new Promise((resolve, reject) => {
      const commandString = `${JSON.stringify({ id: 1, ...command })}\r\n`;

      const hasWritten = socketBalancer.call((socket) => {
        socket.write(commandString, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(command);
          }
        });
      });

      if (!hasWritten) {
        reject("Balancer error: Quota exceeded");
      }
    });
  };

  const closeConnection = () => {
    sockets.forEach((socket) => {
      socket.destroy();
    });
  };

  const onError = (listener: (message: string) => void) => {
    sockets.forEach((socket) => {
      socket.on("data", (data) => {
        try {
          const rows = data.toString("utf8").split("\r\n"),
            error = JSON.parse(rows[0]).error;

          if (error) {
            listener(`Light bulb error: ${error.message}`);
          }
        } catch (err) {}
      });
    });
  };

  return {
    sendCommand,
    close: closeConnection,
    onError,
  };
}
