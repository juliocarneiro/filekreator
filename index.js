#!/usr/bin/env node
'use strict';

var program = require( 'commander' );
var pkg = require( './package.json' );

program.version( pkg.version );
program.parse( process.argv );

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("FILEKREATOR", {
        font: "epic",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
};

const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "Digite o nome do arquivo que deseja criar:"
    },
    {
      type: "list",
      name: "EXTENSION",
      message: "Qual a extensao do seu arquivo?",
      choices: [".rb", ".js", ".php", ".css", ".html"],
      filter: function(val) {
        return val.split(".")[1];
      }
    }
  ];
  return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`
  shell.touch(filePath);
  return filePath;
};

const success = filepath => {
  console.log(
    chalk.white.bgGreen.bold(`Feito! Arquivo criado em: ${filepath}`)
  );
};

const run = async () => {
  init();

  const answers = await askQuestions();
  const { FILENAME, EXTENSION } = answers;

  const filePath = createFile(FILENAME, EXTENSION);

  success(filePath);
};

run();