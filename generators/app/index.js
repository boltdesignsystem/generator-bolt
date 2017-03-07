/*jshint -W097 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var caseFilter = require('./case-filters.js')();

var validateString = function(input) {
  if (typeof input !== 'string') {
    this.log(chalk.red('You must pass a valid string !'));
    return false;
  } else if (input.length === 0) {
    this.log(chalk.red('Tss Tss Tss, Write something !'));
    return false;
  }
  return true;
};

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.option('noinstall');

    // Have Yeoman greet the user.
    this.log(yosay(
      "Let's build some " + chalk.red("\nPegaKit") + " components!"
    ));

    this.folders = {
      src: 'source/_patterns',
      dest: 'dest',
      test: 'tests',
      styleguide: 'demo',
    };
  },

  prompting: function () {
    return this.prompt([
      {
        type: 'input',
        name: 'names',
        message: 'What is the name of your PegaKit pattern? (ex. `button` or `ui-list`)',
        required: true,
        default: "pattern-name",
        validate: function(input) {
          if (typeof input !== 'string') {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          } else if (input.length === 0) {
            this.log(chalk.red('Tss Tss Tss, Write something !'));
            return false;
          }
          return true;
        }.bind(this),
        filter: function(input) {
          let isPlural = input.slice(-1) === 's';
          let singular = isPlural ? input.slice(0, input.length - 1) : input;
          let plural = isPlural ? input : input + 's';

          this.names = {
            camelcase: {
              singular: caseFilter.toCamelCase(singular),
              plural: caseFilter.toCamelCase(plural),
              default: caseFilter.toCamelCase(input)
            },
            pascalcase: {
              singular: caseFilter.toPascalCase(singular),
              plural: caseFilter.toPascalCase(plural),
              default: caseFilter.toPascalCase(input)
            },
            kebabcase: {
              singular: caseFilter.toKebabCase(singular),
              plural: caseFilter.toKebabCase(plural),
              default: caseFilter.toKebabCase(input)
            },
            lowercase: {
              singular: caseFilter.toLowerCase(singular),
              plural: caseFilter.toLowerCase(plural),
              default: caseFilter.toLowerCase(input)
            },
            uppercase: {
              singular: caseFilter.toUpperCase(singular),
              plural: caseFilter.toUpperCase(plural),
              default: caseFilter.toUpperCase(input)
            },
            capitalcase: {
              singular: caseFilter.toCapitalCase(singular),
              plural: caseFilter.toCapitalCase(plural),
              default: caseFilter.toCapitalCase(input)
            },
            snakecase: {
              singular: caseFilter.toSnakeCase(singular),
              plural: caseFilter.toSnakeCase(plural),
              default: caseFilter.toSnakeCase(input)
            },
            attachedcase: {
              singular: caseFilter.toAttachedCase(singular),
              plural: caseFilter.toAttachedCase(plural),
              default: caseFilter.toAttachedCase(input)
            },
          }

          return input.charAt(0).toUpperCase() + input.slice(1).replace(' ', '-');
          
          this.patternName = this.input;
          
        }.bind(this),
      },
      {
        type: 'list',
        name: 'patternType',
        message: 'What type of pattern is this?',
        require: true,
        default: '01-atoms',
        choices: [
          {
            name: 'atom',
            value: '01-atoms'
          },
          {
              name: 'molecule',
              value: '02-molecules'
          },
          {
            name: 'organism',
            value: '03-organisms'
          },
          {
            name: 'template',
            value: '04-templates',
          },
          {
            name: 'page',
            value: '05-pages'
          }
        ],
        filter: function(input) {
          this.patternType = input;
        }.bind(this)
    },

      {
        type: 'input',
        name: 'patternDescription',
        message: 'What is the description of your component ?',
        required: true,
        default: function(answers) {
          return 'The default ' + this.names.pascalcase.default + ' component. Part of PegaKit\'s pre-packaged UI Toolkit.';
        }.bind(this),
        validate: function(input) {
          if (typeof input !== 'string') {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          } else if (input.length === 0) {
            this.log(chalk.red('Tss Tss Tss, Write something !'));
            return false;
          }
          return true;
        }.bind(this),
      },

      {
        type: 'input',
        name: 'patternUrl',
        message: 'What is the url of the repository ?',
        default: function(answers) {
          return 'https://github.com/pega-digital/pegakit/tree/master/source/_patterns/' + this.patternType + '/' + this.names.lowercase.plural;
        }.bind(this),
        validate: function(input) {
          if (typeof input !== 'string' || input.length === 0) {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          }
          return true;
        }.bind(this),
        required: true
      },

      {
        type: 'input',
        name: 'packageName',
        message: 'What\'s the name of your future packages (for bower/npm/yarn) ?',
        default: function(answers) {
          return 'pegakit-' + this.names.kebabcase.plural;
        }.bind(this),
        // @TODO check with bower and npm API if names are availables
        validate: function(input) {
          if (typeof input !== 'string' || input.length === 0) {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          }
          return true;
        }.bind(this),
        required: true,
      },

      {
        type: 'input',
        name: 'author_name',
        message: 'What is your name?',
        default: 'Salem Ghoweri',
        validate: function(input) {
          if (typeof input !== 'string' || input.length === 0) {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          }
          return true;
        }.bind(this),
        required: true
      },

      {
        type: 'input',
        name: 'author_mail',
        message: 'What is your email address ?',
        default: 'salem.ghoweri@pega.com',
        validate: function(input) {
          var mailregex = /\S+@\S+\.\S+/;
          if (!mailregex.test(input)) {
            this.log(chalk.red('Please enter a valid email address!'));
            return false;
          }
          return true;
        }.bind(this),
        required: true
      },

      
      {
        type: 'confirm',
        name: 'twig',
        required: true,
        default: true,
        message: function(answers) {
          return 'And what about some twig template ? (located at `' + this.folders.src + '/' + this.patternType + '/' + this.names.kebabcase.default + '.twig`)';
        }.bind(this),
      },
      
      // {
      //   type: 'confirm',
      //   name: 'sass',
      //   required: true,
      //   default: false,
      //   message: function(answers) {
      //     return 'And what about some twig template ? (located at `' + this.folders.src + '/twig/' + this.names.kebabcase.plural + '.html.twig`)';
      //   }.bind(this),
      // },

      // {
      //   type: 'confirm',
      //   name: 'javascript',
      //   required: true,
      //   default: false,
      //   message: function(answers) {
      //     return 'Do you want to include a default JS file with this component? (located at `' + this.folders.src + '/javascript/' + this.names.kebabcase.plural + '.js`)';
      //   }.bind(this),
      // },
    ]).then(function (props) {
      this.props = props;
      this.props.names = this.names;
    }.bind(this));
  },

  writing: {
    scss: function() {
      
      this.folders.src = this.folders.src + '/' + this.patternType + '/' + this.props.names.kebabcase.plural + '/';
      
      this.fs.copyTpl(
        this.templatePath('scss/component.scss'),
        this.destinationPath(this.folders.src + '/' + '_components.' + this.props.names.kebabcase.plural + '.scss'),
        { props: this.props }
      );

    },

    twig: function() {
      if (this.props.twig) {
        this.fs.copyTpl(
          this.templatePath('twig/component.html.twig'),
          this.destinationPath(this.folders.src + '/' + this.props.names.kebabcase.default + '.twig'),
          { props: this.props }
        );
      }
    },

    javascript: function() {
      if (this.props.javascript) {
        this.fs.copyTpl(
          this.templatePath('javascript/component.js'),
          this.destinationPath(this.folders.src + '/' + this.props.names.kebabcase.plural + '.js'),
          { props: this.props }
        );

      }
    },

    test: function() {
      if (this.props.twig) {
        this.fs.copyTpl(
          this.templatePath('tests/spec/component.gspec'),
          this.destinationPath(this.folders.src + '/' + 'tests/spec/' + this.patternType + '-' + this.props.names.kebabcase.default + '.gspec'),
          {
            props: this.props,
            folders: this.folders,
          }
        );
      } else {
        // this.fs.copyTpl(
        //   this.templatePath('test/index.html'),
        //   this.destinationPath(this.folders.test + '/' + this.folders.src + '/index.html'),
        //   {
        //     props: this.props,
        //     folders: this.folders,
        //   }
        // );
      }

      // this.fs.copyTpl(
      //   this.templatePath('test/style.scss'),
      //   this.destinationPath(this.folders.test + '/' + this.folders.src + '/style.scss'),
      //   {
      //     props: this.props,
      //     folders: this.folders,
      //   }
      // );

      // this.fs.copyTpl(
      //   this.templatePath('test/pegakit-component.scss'),
      //   this.destinationPath(this.folders.src + this.folders.test + '/' + '/pegakit-' + this.props.names.kebabcase.plural + '.scss'),
      //   {
      //     props: this.props,
      //     folders: this.folders,
      //   }
      // );
    },

    // styleguide: function() {
    //   if (this.props.twig) {
    //     this.fs.copyTpl(
    //       this.templatePath('styleguide/index.html.twig'),
    //       this.destinationPath(this.folders.src + this.folders.demo + '/' + this.props.names.kebabcase.plural + '-styleguide.html.twig'),
    //       {
    //         props: this.props,
    //         folders: this.folders,
    //       }
    //     );
    //   } else {
    //     this.fs.copyTpl(
    //       this.templatePath('styleguide/index.html'),
    //       this.destinationPath(this.folders.demo + '/' + this.props.names.kebabcase.plural + '-styleguide.html'),
    //       {
    //         props: this.props,
    //         folders: this.folders,
    //       }
    //     );
    //   }
    // 
    //   this.fs.copyTpl(
    //     this.templatePath('styleguide/style.scss'),
    //     this.destinationPath(this.folders.demo + '/' + this.props.names.kebabcase.plural + '-styleguide.scss'),
    //     {
    //       props: this.props,
    //       folders: this.folders,
    //     }
    //   );
    // },

    bower: function() {
      this.fs.copyTpl(
        this.templatePath('bower/bower.json'),
        this.destinationPath(this.folders.src + '/' + 'bower.json'),
        {
          props: this.props,
          folders: this.folders,
        }
      );

      // this.fs.copyTpl(
      //   this.templatePath('bower/.bowerrc'),
      //   this.destinationPath('.bowerrc'),
      //   {
      //     props: this.props,
      //     folders: this.folders,
      //   }
      // );
    },

    readme: function() {
      this.fs.copyTpl(
        this.templatePath('readme/README.md'),
        this.destinationPath(this.folders.src + '/' + 'README.md'),
        {
          props: this.props,
          folders: this.folders,
        }
      );
    },

    npm: function() {
      this.fs.copyTpl(
        this.templatePath('npm/package.json'),
        this.destinationPath(this.folders.src + '/' + 'package.json'),
        {
          props: this.props,
          folders: this.folders,
        }
      );

      this.fs.copy(
        this.templatePath('npm/.npmignore'),
        this.destinationPath(this.folders.src + '/' + '.npmignore')
      );
    },

    // gulp: function() {
    //   this.fs.copyTpl(
    //     this.templatePath('gulp/gulpfile.babel.js'),
    //     this.destinationPath('gulpfile.babel.js'),
    //     {
    //       props: this.props,
    //       folders: this.folders,
    //     }
    //   );
    // 
    //   this.fs.copy(
    //     this.templatePath('gulp/.babelrc'),
    //     this.destinationPath('.babelrc')
    //   );
    // },
  },

  install: function () {
    var elementDir = process.cwd() + '/' + this.folders.src;
    process.chdir(elementDir);
    
    var npmDevDependencies = [
      'gulp',
      'gulp-size',
      'gulp-load-plugins',
      'gulp-prettify',
      'run-sequence',
      'browser-sync',
      'gulp-notify',
      'gulp-sourcemaps',
      'gulp-sass',
      'gulp-autoprefixer',
      'gulp-cssmin',
      'gulp-rename',
      'babel',
      'babel-cli',
      'babel-core',
      'babel-loader',
      'babel-preset-es2015',
    ];

    var bowerDependencies = [
      'pegakit-core',
      'sassy-maps'
    ];

    if (this.props.twig) {
      npmDevDependencies.push(
        'gulp-twig',
        'gulp-ext-replace'
      );
    }

    if (this.props.javascript) {
      npmDevDependencies.push(
        'gulp-babel'
      );
    }

    if (!this.options.noinstall) {
      this.npmInstall(['pegakit-core'], { 'save': true }, function() {
        this.npmInstall(npmDevDependencies, { 'saveDev': true }, function() {
          this.runInstall('yarn', null, function() {
            this.bowerInstall(['pegakit-core'], { 'save': true });
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }
  }
});
