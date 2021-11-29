#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

let currentDirectory = process.cwd();
const fs = require("fs");

const dirReader = (currentDirectory) => {
  const list = fs.readdirSync(currentDirectory);
  list.push("Enter a path");
  return list;
};

const isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};

const ask = () => {
  inquirer
    .prompt([
      {
        name: "filePath",
        type: "list",
        message: "Choose file:",
        choices: dirReader(currentDirectory),
      },
    ])
    .then((answer, error) => {
      const dir = path.join(currentDirectory, answer.filePath);
      if (answer.filePath === "Enter a path") {
        inquirer
          .prompt([
            {
              name: "input",
              type: "input",
              message: "ex. /My Dir",
            },
          ])
          .then((input) => {
            process.chdir(input.input);
            currentDirectory = process.cwd();
            ask();
          });
      } else if (fs.lstatSync(dir).isDirectory()) {
        currentDirectory = path.join(currentDirectory, answer.filePath);
        //`${currentDirectory}\\${answer.filePath}`;
        ask();
      } else if (isFile(dir)) {
        const filePath = path.join(currentDirectory, answer.filePath);
        fs.readFile(filePath, "utf8", (err, file) => {
          inquirer.prompt([
            {
              type: "input",
              name: "query",
              message: "Enter search query",
              filter(query) {
                return file.includes(query)
                  ? `${query} founded in file...`
                  : `${query} not founded in file...`;
              },
            },
          ]);
        });
      }
    });
};
ask();
