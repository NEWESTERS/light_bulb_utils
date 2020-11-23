"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLightBulb = void 0;
const net_1 = require("net");
function connectDevice(address, port) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const socket = new net_1.Socket();
                socket.connect({ host: address, port }, () => {
                    resolve(socket);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
function createLightBulb(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const socket = yield connectDevice(address, 55443);
        let id = 1;
        const sendCommand = (command) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const commandString = `${JSON.stringify(Object.assign({ id }, command))}\r\n`;
                id = id === 1 ? 2 : 1;
                socket.write(commandString, (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(command);
                    }
                });
            });
        });
        const closeConnection = () => {
            socket.destroy();
        };
        const onError = (listener) => {
            socket.on("data", (data) => {
                try {
                    const rows = data.toString("utf8").split("\r\n"), error = JSON.parse(rows[0]).error;
                    if (error) {
                        listener(`Light bulb error: ${error.message}`);
                    }
                }
                catch (err) { }
            });
        };
        return {
            sendCommand,
            close: closeConnection,
            onError,
        };
    });
}
exports.createLightBulb = createLightBulb;
