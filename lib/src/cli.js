#! /usr/bin/env node
import {createServer} from "./ssr.js"
import {info} from "./chalkTheme.js";

console.log(info('vshot is starting'))

await createServer()

process.exit()
