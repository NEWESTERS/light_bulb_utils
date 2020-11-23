import dotenv from "dotenv";

import { createLightBulb } from "../LightBulb";

dotenv.config();

function getRandomBright() {
  return Math.ceil(Math.random() * 99 + 1);
}

(async () => {
  const lightBulb = await createLightBulb(process.env.BULB_ADDRESS);

  lightBulb.onError(console.log);

  setInterval(() => {
    lightBulb
      .sendCommand({
        method: "set_bright",
        params: [getRandomBright(), "sudden", 420],
      })
      .catch(console.log);
  }, 420);
})();
