const minimist = require('minimist');
const error = require('./utils/error');

module.exports = () => {
  // select all elements from pos 2 to the end
  // the first arg will always be the interpreter followed by the name of the file being interpreted.
  const args = minimist(process.argv.slice(2));
  // select the main command
  let cmd = args._[0];

  // if version and help flags are true set the cmd // shortcuts
  if (args.version || args.v) {
    cmd = 'version'
  }
  if (args.help || args.h || !cmd) {
    cmd = 'help'
  }

  // each case export a function (passing along the args to use them later).
  // in this way, we split up the code for each command and only load it into memory when it is called.
  switch (cmd) {
    case 'today':
      require('./cmds/today')(args);
      break;

    case 'forecast':
      require('./cmds/forecast')(args);
      break;

    case 'version':
      require('./cmds/version')(args);
      break;

    case 'help':
      require('./cmds/help')(args);
      break;

    default:
      error(`"${cmd}" is not a valid command!`, true);
      break;
  }
}
