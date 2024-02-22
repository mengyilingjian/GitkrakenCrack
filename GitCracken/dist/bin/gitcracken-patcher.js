"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const program = require("commander");
const emoji = require("node-emoji");
const __1 = require("../");
async function executeActions(actions) {
    __1.Logo.print();
    const patcher = new __1.Patcher({
        asar: program.asar,
        dir: program.dir,
        features: program.feature,
    });
    for (const action of actions) {
        switch (action) {
            case 1: {
                console.log(`${chalk_1.default.green("==>")} ${emoji.get("package")} Backup ` +
                    `${chalk_1.default.green(patcher.asar)} ➔ ${chalk_1.default.green(patcher.backupAsar())}`);
                break;
            }
            case 2: {
                console.log(`${chalk_1.default.green("==>")} ${emoji.get("unlock")} Unpack ${chalk_1.default.green(patcher.asar)} ➔ ` + `${chalk_1.default.green(patcher.dir)}`);
                patcher.unpackAsar();
                break;
            }
            case 3: {
                console.log(`${chalk_1.default.green("==>")} ${emoji.get("hammer")} Patch ${chalk_1.default.green(patcher.dir)} ` +
                    `with ${patcher.features
                        .map((feature) => `${chalk_1.default.green(feature)}`)
                        .join(", ")} features`);
                patcher.patchDir();
                break;
            }
            case 4: {
                console.log(`${chalk_1.default.green("==>")} ${emoji.get("lock")} Pack ${chalk_1.default.green(patcher.dir)} ➔ ` + `${chalk_1.default.green(patcher.asar)}`);
                await patcher.packDirAsync();
                break;
            }
            case 5: {
                console.log(`${chalk_1.default.green("==>")} ${emoji.get("fire")} Remove ${chalk_1.default.green(patcher.dir)}`);
                patcher.removeDir();
                break;
            }
        }
    }
    console.log(`${chalk_1.default.green("==>")} ${emoji.get("ok_hand")} Patching done!`);
}
program
    .name("gitcracken-patcher")
    .description("GitKraken patcher")
    .option("-a, --asar <file>", "app.asar file")
    .option("-d, --dir <dir>", "app directory")
    .option("-f, --feature <value>", "patcher feature", (val, memo) => {
    memo.push(val);
    return memo;
}, [])
    .arguments("[actions...]")
    .action(async (strActions) => {
    if (program.feature.length === 0) {
        program.feature.push("pro");
    }
    const actions = [];
    if (!strActions || !strActions.length) {
        actions.push(1, 2, 3, 4, 5);
    }
    else {
        strActions.forEach((item) => {
            switch (item.toLowerCase()) {
                case "backup":
                    actions.push(1);
                    break;
                case "unpack":
                    actions.push(2);
                    break;
                case "patch":
                    actions.push(3);
                    break;
                case "pack":
                    actions.push(4);
                    break;
                case "remove":
                    actions.push(5);
                    break;
            }
        });
    }
    await executeActions(actions);
})
    .parse(process.argv);
