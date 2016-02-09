import chalk from 'chalk';

export default {
  log: message => console.log(message),
  error: message => console.error(chalk.red(message))
};
