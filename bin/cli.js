#!/usr/bin/env node

const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to run command: ${command}`, e);
    return false;
  }
  return true;
};

const repoName = process.argv[2];

if (!repoName) {
  console.log("Please specify a name for your project");
  process.exit(1);
}

const gitCheckoutCommand = `git clone --depth 1 https://github.com/ariel-nathan/nat-app.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Creating new project ${repoName}...`);

console.log("Cloning repository...");
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(1);

console.log("Installing dependencies...");
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(1);

console.log("Congrats! Your project is ready to go!");
console.log(`cd ${repoName} && npm run dev`);
