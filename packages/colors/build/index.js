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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageVibrantColor = exports.getImageVibrancePalette = exports.isPrioritizedColor = exports.isColorsSame = void 0;
const node_vibrant_1 = __importDefault(require("node-vibrant"));
const color_1 = __importDefault(require("color"));
function isColorsSame(color1, color2) {
    const c1 = color_1.default.rgb(color1), c2 = color_1.default.rgb(color2);
    return (Math.abs(c1.hue() - c2.hue()) < 30 &&
        Math.abs(c1.saturationl() - c2.saturationl()) < 15 &&
        Math.abs(c1.lightness() - c2.lightness()) < 15);
}
exports.isColorsSame = isColorsSame;
function isPrioritizedColor(color) {
    const hslColor = color_1.default.rgb(color).hsl();
    return ((hslColor[0] <= 60 || hslColor[0] >= 345) &&
        hslColor[1] >= 85 &&
        hslColor[2] >= 45);
}
exports.isPrioritizedColor = isPrioritizedColor;
function getImageVibrancePalette(imageData) {
    return __awaiter(this, void 0, void 0, function* () {
        return node_vibrant_1.default.from(imageData).getPalette();
    });
}
exports.getImageVibrancePalette = getImageVibrancePalette;
function getImageVibrantColor(imageData) {
    return __awaiter(this, void 0, void 0, function* () {
        const palette = yield getImageVibrancePalette(imageData);
        return palette.Vibrant.rgb;
    });
}
exports.getImageVibrantColor = getImageVibrantColor;
