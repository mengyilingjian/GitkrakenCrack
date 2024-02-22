#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const global_1 = require("../global");
program
    .name("gitcracken")
    .version(global_1.packageJson.version)
    .description(global_1.packageJson.description)
    .command("about", "about GitCracken")
    .command("appid", "GitKraken AppId")
    .command("patcher [actions...]", "GitKraken patcher")
    .command("secfile [files...]", "read GitKraken secFile")
    .parse(process.argv);
