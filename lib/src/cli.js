#! /usr/bin/env node
import { createServer } from './server.js'
import {error, info} from './chalkTheme.js'
import { program } from 'commander'
import {RENDERER_PATH} from "./global.js";
import fs from "fs";

// TODO: description
program.option('-a, --approve', '', false)

program.parse(process.argv)

const options = program.opts()

console.log(info('vshot is starting'))

try {
    await createServer(options.approve)
} catch (e) {
    console.log(error(e))
}


process.stdin.resume()

function cleanUp() {
    fs.unlinkSync(RENDERER_PATH)
    process.exit()
}

process.on('exit', cleanUp)
process.on('SIGINT', cleanUp)
process.on('SIGUSR1', cleanUp)
process.on('SIGUSR2', cleanUp)
process.on('uncaughtException', cleanUp)
