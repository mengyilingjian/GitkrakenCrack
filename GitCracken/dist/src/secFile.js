"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const fs = require("fs-extra");
class SecFile {
    constructor(fileName, password, algorithm = "aes-256-cbc") {
        this._fileName = fileName;
        this._password = password;
        this._algorithm = algorithm;
    }
    get fileName() {
        return this._fileName;
    }
    get password() {
        return this._password;
    }
    get algorithm() {
        return this._algorithm;
    }
    get data() {
        return this._data;
    }
    read() {
        const decipher = crypto.createDecipher(this.algorithm, this.password);
        this._data = JSON.parse(Buffer.concat([
            decipher.update(fs.readFileSync(this.fileName)),
            decipher.final(),
        ]).toString("utf8"));
    }
}
exports.SecFile = SecFile;
