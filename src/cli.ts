#!/usr/bin/env node
import { CLIApplication } from './cli/index.js';

const bootstrap = () => {
  const cli = new CLIApplication();

  cli.runCommands(process.argv);
};

bootstrap();
