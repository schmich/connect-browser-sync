var shell = require('shelljs');
var inquirer = require('inquirer');

module.exports = function(grunt) {
  grunt.registerTask('npm:publish', 'Publish package to npm.', function() {
    var done = this.async();

    grunt.log.write('Creating package...');

    var result = shell.exec('npm pack', { silent: true });
    if (result.code == 0) {
      grunt.log.ok();
    } else {
      grunt.log.error().error('Error creating package:\n' + result.output);
      done();
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
          grunt.log.write('Publishing package...');
          var result = shell.exec('npm publish "' + archive + '"', { silent: true });
          if (result.code == 0) {
            grunt.log.ok();
          } else {
            grunt.log.error().error('Error publishing package:\n' + result.output);
          }
        }
      } finally {
        grunt.log.write('Removing temporary package...');
        shell.rm(archive);
        grunt.log.ok();
      }

      done();
    });
  });
};
