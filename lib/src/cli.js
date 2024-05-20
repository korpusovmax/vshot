#! /usr/bin/env node
import {createServer} from './server.js'
import {error, info} from './chalkTheme.js'
import {program} from 'commander'
import {RENDERER_PATH} from "./global.js";
import fs from "fs";

async function readConfigFile() {
    // reading config if exists (must be in dir running from)
    const configPath = process.cwd() + '/vshot.config.js'
    if (fs.existsSync(configPath)) {
        await import('file://' + configPath).then(
            data => {
                const conf = data.default
                Object.keys(conf).forEach(key => {
                    program.setOptionValueWithSource(key, conf[key], 'config');
                })
            }
        ).catch(e => {
            console.log(error('when loading vhost config. '+e))
        })
    }
}

program.option('-a, --approve', 'Approve current changes. all screenshots diff files will be removed', false)
program.option('-p, --pattern', 'Scene components pattern', '**/*.vshot.vue')
program.option('-p, --path', 'Path to save all screenshots', '<root>/vshots')
program.description('Vshot - new tool for easy vue component screenshots')
program.parse(process.argv)

const options = program.opts()

try {
    console.log(info('vshot is starting'))
    await readConfigFile()

    await createServer(options)
} catch (e) {
    console.log(error(e))
}

function cleanUp() {
    fs.unlinkSync(RENDERER_PATH)
    process.exit()
}

cleanUp()

process.on('exit', cleanUp)
process.on('SIGINT', cleanUp)
process.on('SIGUSR1', cleanUp)
process.on('SIGUSR2', cleanUp)
process.on('uncaughtException', cleanUp)
