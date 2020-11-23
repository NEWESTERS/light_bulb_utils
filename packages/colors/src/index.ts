import Vibrant from "node-vibrant";
import Color from "color";

export type RGBColor = [number, number, number];

export function isColorsSame(color1: RGBColor, color2: RGBColor) {
  const c1 = Color.rgb(color1),
    c2 = Color.rgb(color2);

  return (
    Math.abs(c1.hue() - c2.hue()) < 30 &&
    Math.abs(c1.saturationl() - c2.saturationl()) < 15 &&
    Math.abs(c1.lightness() - c2.lightness()) < 15
  );
}

export function isPrioritizedColor(color: RGBColor) {
  const hslColor = Color.rgb(color).hsl();

  return (
    (hslColor[0] <= 60 || hslColor[0] >= 345) &&
    hslColor[1] >= 85 &&
    hslColor[2] >= 45
  );
}

export async function getImageVibrancePalette(imageData: Buffer) {
  return Vibrant.from(imageData).getPalette();
}

export async function getImageVibrantColor(
  imageData: Buffer
): Promise<RGBColor> {
  const palette = await getImageVibrancePalette(imageData);

  return palette.Vibrant.rgb;
}
