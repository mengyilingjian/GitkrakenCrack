"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
var Platforms;
(function (Platforms) {
    Platforms[Platforms["linux"] = 1] = "linux";
    Platforms[Platforms["windows"] = 2] = "windows";
    Platforms[Platforms["macOS"] = 3] = "macOS";
})(Platforms = exports.Platforms || (exports.Platforms = {}));
exports.CURRENT_PLATFORM = (() => {
    if (process.platform === "linux") {
        return Platforms.linux;
    }
    if (process.platform === "win32") {
        return Platforms.windows;
    }
    if (process.platform === "darwin") {
        return Platforms.macOS;
    }
    console.error(`We Are Deeply Sorry! Your OS ${chalk_1.default.red.bold(process.platform)} is not supported!`);
    return process.exit(1);
})();
