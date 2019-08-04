const { fork } = require('child_process');
const { join } = require('path');
const FATHER_BUILD_BIN = require.resolve('father-build/bin/father-build.js');

const isWatchMode = process.argv.includes('-w') || process.argv.includes('--watch');

const builds = [
  {
    name: 'server build',
    cwd: join(__dirname, '..'),
    args: isWatchMode ? [ '--watch' ] : [],
  },
  {
    name: 'client build',
    cwd: join(__dirname, '../src/ui'),
    args: isWatchMode ? [ '--watch' ] : [],
  },
];

const buildProcess = ({ name, cwd, args = [] }) => {
  console.log(`Begin ${name}`);
  return new Promise((resolve, reject) => {
    const cp = fork(
      FATHER_BUILD_BIN,
      args,
      {
        cwd,
      },
    );
    cp.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(`Build ${name} error`);
    });
  });
};

(async () => {
  for (const build of builds) {
    await buildProcess(build);
  }
})();
