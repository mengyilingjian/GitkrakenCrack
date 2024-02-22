"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const program = require("commander");
const __1 = require("../");
program
    .name("gitcracken-secfile")
    .description("read GitKraken secFile")
    .option("-i, --appid <id>", "AppId for secFile decrypt", __1.AppId.read())
    .arguments("[files...]")
    .action((files) => {
    __1.Logo.print();
    for (const file of files || []) {
        console.log(`${chalk_1.default.green("==>")} ${chalk_1.default.bold(file)}`);
        const secFile = new __1.SecFile(file, program.appid);
        secFile.read();
        console.log(JSON.stringify(secFile.data, null, 2));
    }
})
    .parse(process.argv);
