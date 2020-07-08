#!/usr/bin/env node
// So `npm i` installs the CLI correctly across all operating systems

import * as yargs from 'yargs';
import tyronCLI from './tyronCLI';

// tslint:disable-next-line: no-unused-expression - Invoking `argv` is the way to trigger argument processing in `yargs`...
yargs
  .scriptName('tyron') // To make help print 'tyron' instead of 'index.js'
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1, ' Try: tyron <command>, with command= operation')
  .command('operation', '(to execute a tyronZIL DID-operation, try: $tyron operation <subcommand>, with subcommand= create|update|recover|deactivate)', (yargs) => {
    yargs
      .usage('Usage: $0 operation <subcommand> [options]')
      .demandCommand(1, 'Specify a subcommand: create|update|recover|deactivate')
      .command('create', '(creates a unique digital identity did:tyron:zil)', async () => {
        await tyronCLI.handleCreate();
      })

      /*
      .command('update', 'Generates an tyronZIL DID update operation.', () => {
        console.log('To be implemented.');
      })
      .command('recover', 'Generates a tyronZIL DID recover operation.', () => {
        console.log('To be implemented.');
      })
      .command('deactivate', 'Generates a tyronZIL DID deactivate operation.', () => {
        console.log('To be implemented.');
      })
      .updateStrings({
        'Commands:': 'Operation type:'
      })
      .wrap(null)
      .strict(); // The sub-command must be one of the explicitly defined sub-commands
  })
  .command('resolve', 'Resolves a tyronZIL DID (read operation).', () => {
    console.log('To be implemented.');
    */
  })
  .strict() // The command must be one of the explicitly defined commands
  .help(false) // Disabling --help option.
  .version(false) // Disabling --version option.
  .argv;