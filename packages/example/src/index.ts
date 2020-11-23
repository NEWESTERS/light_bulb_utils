import chalk from "chalk";
import dotenv from "dotenv";
import {
  isColorsSame,
  isPrioritizedColor,
  RGBColor,
  getImageVibrantColor,
} from "@smart-light/colors";
import { createLightBulb, getRGBInteger } from "@smart-light/light-bulb";
import { createUsbScreenshoter } from "@smart-light/usb-screenshoter";

import { pipify } from "./pipify";

dotenv.config();

const INTERVAL = 200,
  ITERATIONS_TO_CHANGE = 5;

(async () => {
  const screenshoter = await createUsbScreenshoter(),
    lightBulb = await createLightBulb(process.env.BULB_ADDRESS);

  lightBulb.onError(console.log);

  const screenshotPipe = pipify(screenshoter.getScreenshot, INTERVAL);

  let iterationNumber = 0,
    currentColor: RGBColor = [255, 255, 255];

  screenshotPipe.subscribe(async (screenshot) => {
    const dominantColor = await getImageVibrantColor(screenshot);
    console.log(chalk.bgRgb(...dominantColor)("   "));

    if (iterationNumber === 0 || isPrioritizedColor(dominantColor)) {
      if (!isColorsSame(currentColor, dominantColor)) {
        iterationNumber = ITERATIONS_TO_CHANGE;
        console.log(`Change color to: ${chalk.bgRgb(...dominantColor)("  ")}`);
        currentColor = dominantColor;
        await lightBulb.sendCommand({
          method: "set_rgb",
          params: [getRGBInteger(dominantColor), "smooth", INTERVAL],
        });
      }
    } else {
      iterationNumber -= 1;
    }
  });

  screenshotPipe.start();
})();
