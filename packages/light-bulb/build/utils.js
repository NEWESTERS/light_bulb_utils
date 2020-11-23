"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRGBFromInteger = exports.getRGBInteger = void 0;
function getRGBInteger(color) {
    return color[0] * 65536 + color[1] * 256 + color[2];
}
exports.getRGBInteger = getRGBInteger;
function getRGBFromInteger(colorInteger) {
    const blue = colorInteger % 256, green = Math.ceil(((colorInteger - blue) % 65536) / 256), red = Math.ceil(colorInteger / 65536);
    return [red, green, blue];
}
exports.getRGBFromInteger = getRGBFromInteger;
