var gulp = require('gulp');
var shell = require('shelljs');
var inquirer = require('inquirer');
var log = require('gulp-util').log;
var colors = require('gulp-util').colors;

function error(message) {
  console.log('[' + colors.red('Error') + '] ' + message);
}

gulp.task('npm:publish', function(next, err) {
  log('Creating package...');

  var result = shell.exec('npm pack', { silent: true });
  if (result.code == 0) {
    log('OK');
  } else {
    // TODO: Better error.
    error('Error creating package:\n' + result.output);
    next();
    return;
  }

  var archive = result.output.trim();
  shell.exec('tar -ztvf "' + archive + '"');

  var question = {
    type: 'confirm',
    name: 'publish',
    message: 'Publish package?',
    default: false
  };

  inquirer.prompt([question], function(answers) {
    try {
      if (answers.publish) {
        log('Publishing package...');
        var result = shell.exec('npm publish "' + archive + '"', { silent: true });
        if (result.code == 0) {
          log('OK');
        } else {
          // TODO: Better error.
          log('Error publishing package:\n' + result.output);
        }
      }
    } finally {
      log('Removing temporary package...');
      shell.rm(archive);
      log('OK');
    }

    next();
  });
});

gulp.task('default', []);
