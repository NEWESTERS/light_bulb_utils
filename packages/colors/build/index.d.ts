/// <reference types="node" />
export declare type RGBColor = [number, number, number];
export declare function isColorsSame(color1: RGBColor, color2: RGBColor): boolean;
export declare function isPrioritizedColor(color: RGBColor): boolean;
export declare function getImageVibrancePalette(imageData: Buffer): Promise<import("@vibrant/color").Palette>;
export declare function getImageVibrantColor(imageData: Buffer): Promise<RGBColor>;
