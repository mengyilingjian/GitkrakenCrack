"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const figlet = require("figlet");
const global_1 = require("../global");
class Logo {
    static print(text = "GitCracken") {
        console.log();
        console.log(figlet.textSync(text, "ANSI Shadow"));
        console.log(`${chalk_1.default.bold("• Description")}: ${global_1.packageJson.description}`);
        console.log(`${chalk_1.default.bold("• Version")}: ${global_1.packageJson.version}`);
        console.log(`${chalk_1.default.bold("• Author")}: ${global_1.packageJson.author}`);
        console.log(`${chalk_1.default.bold("• License")}: ${global_1.packageJson.license}`);
        console.log(`${chalk_1.default.bold("• Home Page")}: ${global_1.packageJson.homepage}`);
        console.log();
    }
}
exports.Logo = Logo;
