"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const path = require("path");
const asar = require("asar");
const diff = require("diff");
const fs = require("fs-extra");
const natsort_1 = require("natsort");
const global_1 = require("../global");
const platform_1 = require("./platform");
class Patcher {
    static findAsarUnix(...files) {
        return files.find((file) => fs.existsSync(file));
    }
    static findAsarLinux() {
        return Patcher.findAsarUnix("/opt/gitkraken/resources/app.asar", "/usr/share/gitkraken/resources/app.asar");
    }
    static findAsarWindows() {
        const gitkrakenLocal = path.join(os.homedir(), "AppData/Local/gitkraken");
        if (!fs.existsSync(gitkrakenLocal)) {
            return undefined;
        }
        const apps = fs
            .readdirSync(gitkrakenLocal)
            .filter((item) => item.match(/^app-\d+\.\d+\.\d+$/));
        let app = apps.sort(natsort_1.default({ desc: true }))[0];
        if (!app) {
            return undefined;
        }
        app = path.join(gitkrakenLocal, app, "resources/app.asar");
        return fs.existsSync(app) ? app : undefined;
    }
    static findAsarMacOS() {
        return Patcher.findAsarUnix("/Applications/GitKraken.app/Contents/Resources/app.asar");
    }
    static findAsar(dir) {
        if (dir) {
            return path.normalize(dir) + ".asar";
        }
        switch (platform_1.CURRENT_PLATFORM) {
            case platform_1.Platforms.linux:
                return Patcher.findAsarLinux();
            case platform_1.Platforms.windows:
                return Patcher.findAsarWindows();
            case platform_1.Platforms.macOS:
                return Patcher.findAsarMacOS();
        }
    }
    static findDir(asarFile) {
        return path.join(path.dirname(asarFile), path.basename(asarFile, path.extname(asarFile)));
    }
    constructor(options) {
        const maybeAsar = options.asar || Patcher.findAsar(options.dir);
        if (!maybeAsar) {
            throw new Error("Can't find app.asar!");
        }
        this._asar = maybeAsar;
        this._dir = options.dir || Patcher.findDir(this.asar);
        this._features = options.features;
        if (!this.features.length) {
            throw new Error("Features is empty!");
        }
    }
    get asar() {
        return this._asar;
    }
    get dir() {
        return this._dir;
    }
    get features() {
        return this._features;
    }
    backupAsar() {
        const backup = `${this.asar}.${new Date().getTime()}.backup`;
        fs.copySync(this.asar, backup);
        return backup;
    }
    unpackAsar() {
        asar.extractAll(this.asar, this.dir);
    }
    packDirAsync() {
        return asar.createPackage(this.dir, this.asar);
    }
    removeDir() {
        fs.removeSync(this.dir);
    }
    patchDir() {
        for (const feature of this.features) {
            switch (feature) {
                case "pro":
                    this.patchDirWithPro();
                    break;
                default:
                    this.patchDirWithFeature(feature);
                    break;
            }
        }
    }
    patchDirWithPro() {
        const bundlePath = path.join(this.dir, "src/main/static/main.bundle.js");
        const patchedPattern = '(delete json.proAccessState,delete json.licenseExpiresAt,json={...json,licensedFeatures:["pro"]});';
        const pattern1 = /const [^=]*="dev"===[^?]*\?"[\w+/=]+":"[\w+/=]+";/;
        const pattern2 = /return (JSON\.parse\(\([^;]*?\)\(Buffer\.from\([^;]*?,"base64"\)\.toString\("utf8"\),Buffer\.from\([^;]*?\.secure,"base64"\)\)\.toString\("utf8"\)\))\};/;
        const searchValue = new RegExp(`(?<=${pattern1.source})${pattern2.source}`);
        const replaceValue = "var json=$1;" +
            '("licenseExpiresAt"in json||"licensedFeatures"in json)&&' +
            '(delete json.proAccessState,delete json.licenseExpiresAt,json={...json,licensedFeatures:["pro"]});' +
            "return json};";
        const sourceData = fs.readFileSync(bundlePath, "utf-8");
        const sourcePatchedData = sourceData.replace(searchValue, replaceValue);
        if (sourceData === sourcePatchedData) {
            if (sourceData.indexOf(patchedPattern) < 0)
                throw new Error("Can't patch pro features, pattern match failed. Get support from https://t.me/gitkrakencrackchat");
            throw new Error("It's already patched.");
        }
        fs.writeFileSync(bundlePath, sourcePatchedData, "utf-8");
    }
    patchDirWithFeature(feature) {
        const patches = diff.parsePatch(fs.readFileSync(path.join(global_1.baseDir, "patches", `${feature}.diff`), "utf8"));
        for (const patch of patches) {
            this.patchDirWithPatch(patch);
        }
    }
    patchDirWithPatch(patch) {
        const sourceData = fs.readFileSync(path.join(this.dir, patch.oldFileName), "utf8");
        const sourcePatchedData = diff.applyPatch(sourceData, patch);
        if (sourcePatchedData === false) {
            throw new Error(`Can't patch ${patch.oldFileName}`);
        }
        if (patch.oldFileName !== patch.newFileName) {
            fs.unlinkSync(path.join(this.dir, patch.oldFileName));
        }
        fs.writeFileSync(path.join(this.dir, patch.newFileName), sourcePatchedData, "utf8");
    }
}
exports.Patcher = Patcher;
