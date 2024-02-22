"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const __1 = require("../");
program
    .name("gitcracken-about")
    .description("about GitCracken")
    .action(() => {
    __1.Logo.print();
})
    .parse(process.argv);
