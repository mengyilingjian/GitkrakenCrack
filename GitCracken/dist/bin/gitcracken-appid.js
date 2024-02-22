"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
program
    .name("gitcracken-appid")
    .description("GitKraken AppId")
    .command("generate", "generate GitKraken AppId")
    .command("read", "read GitKraken AppId from config")
    .parse(process.argv);
