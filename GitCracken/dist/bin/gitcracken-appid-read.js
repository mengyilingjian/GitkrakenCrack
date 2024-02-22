"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const program = require("commander");
const src_1 = require("../src");
program
    .name("gitcracken-appid-read")
    .description("read GitKraken AppId from config")
    .option("-c, --config <file>", "path to config")
    .action(() => {
    src_1.Logo.print();
    console.log(`${chalk_1.default.green("==>")} Current AppId ${chalk_1.default.green(src_1.AppId.read(program.config) || "null")}`);
})
    .parse(process.argv);
