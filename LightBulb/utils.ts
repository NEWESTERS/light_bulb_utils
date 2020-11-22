import chalk from "chalk";

import { RGBColor } from "../dataModel";

export function getRGBInteger(color: RGBColor): number {
  return color[0] * 65536 + color[1] * 256 + color[2];
}

export function getRGBFromInteger(colorInteger: number): RGBColor {
  const blue = colorInteger % 256,
    green = Math.ceil(((colorInteger - blue) % 65536) / 256),
    red = Math.ceil(colorInteger / 65536);

  return [red, green, blue];
}

export function handleError(data: any) {
  try {
    const error = JSON.parse(data.toString("utf8").split("\r\n")[0]).error;

    if (error) {
      console.log(chalk.red(error.message));
    }
  } catch (err) {}
}
