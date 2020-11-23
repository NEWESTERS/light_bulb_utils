import { RGBColor } from "@smart-light/colors";

export function getRGBInteger(color: RGBColor): number {
  return color[0] * 65536 + color[1] * 256 + color[2];
}

export function getRGBFromInteger(colorInteger: number): RGBColor {
  const blue = colorInteger % 256,
    green = Math.ceil(((colorInteger - blue) % 65536) / 256),
    red = Math.ceil(colorInteger / 65536);

  return [red, green, blue];
}
