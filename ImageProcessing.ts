import Vibrant from "node-vibrant";

import { RGBColor } from "./dataModel";

export async function getImageVibrancePalette(imageData: Buffer) {
  return Vibrant.from(imageData).getPalette();
}

export async function getImageVibrantColor(
  imageData: Buffer
): Promise<RGBColor> {
  const palette = await getImageVibrancePalette(imageData);

  return palette.Vibrant.rgb;
}
