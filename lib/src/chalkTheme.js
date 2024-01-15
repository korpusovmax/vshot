import chalk from 'chalk'

const info = chalk.hex('#1a7ec2')
const error = (s) => chalk.hex('#e31b33')('vshot error: ' + s)
const warning = chalk.hex('#e39d1b')

export { info, error, warning }
