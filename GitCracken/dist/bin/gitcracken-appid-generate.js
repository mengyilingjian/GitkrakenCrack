"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const program = require("commander");
const __1 = require("../");
program
    .name("gitcracken-appid-generate")
    .description("generate GitKraken AppId")
    .option("-m, --mac <value>", "use specific mac address (or any other string)")
    .action(async () => {
    __1.Logo.print();
    console.log(`${chalk_1.default.green("==>")} Generated AppId ${chalk_1.default.green(program.mac ? __1.AppId.generate(program.mac) : await __1.AppId.generateAsync())}`);
})
    .parse(process.argv);
