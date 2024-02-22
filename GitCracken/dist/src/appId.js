"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const os = require("os");
const path = require("path");
const util = require("util");
const fs = require("fs-extra");
const getmac_1 = require("getmac");
const uuid = require("uuid");
const platform_1 = require("./platform");
class AppId {
    static generate(mac) {
        return crypto
            .createHash("sha1")
            .update(mac, "utf8")
            .digest("hex");
    }
    static async generateAsync() {
        let mac;
        try {
            mac = await util.promisify(getmac_1.getMac)();
        }
        catch {
            mac = uuid.v4();
        }
        return AppId.generate(mac);
    }
    static read(config = AppId.configPath()) {
        if (!config || !fs.existsSync(config)) {
            return undefined;
        }
        return fs.readJSONSync(config).appId;
    }
    static configPath() {
        switch (platform_1.CURRENT_PLATFORM) {
            case platform_1.Platforms.linux:
            case platform_1.Platforms.macOS:
                return path.join(os.homedir(), ".gitkraken/config");
            case platform_1.Platforms.windows:
                return path.join(os.homedir(), "AppData/Roaming/.gitkraken/config");
        }
    }
}
exports.AppId = AppId;
