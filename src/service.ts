import { INestApplicationContext, Injectable } from '@nestjs/common';
import { Command, CommanderError } from 'commander';
import { CommandError, createSubCommand } from './commander';
import {
    IConsoleOptions,
    InjectCommander,
    ICommandDecoratorOptions
} from './decorators';
import { formatResponse } from './helpers';
import { IMethodsMetadata } from './scanner';

export interface IConsoleService {
    getCli(): Command;
    getContainer(): INestApplicationContext;
    setContainer<A extends INestApplicationContext>(
        container: A
    ): IConsoleService;
    init(argv: string[]): Command;
    createSubCommand(parent: Command, options: IConsoleOptions): Command;
}

@Injectable()
export class ConsoleService implements IConsoleService {
    protected container: INestApplicationContext;

    constructor(@InjectCommander() protected readonly cli: Command) {}

    private displayErrorWithHelp(command: Command, error: Error) {
        try {
            command.exitOverride();
            return command.help(
                (h: string) => `${formatResponse(error)}\n${h}`
            );
        } catch (e) {
            if (!(e instanceof CommanderError) || e.code !== 'commander.help') {
                throw e;
            }
        }
    }

    getCli() {
        return this.cli;
    }

    setContainer(container: INestApplicationContext): IConsoleService {
        this.container = container;
        return this;
    }

    getContainer(): INestApplicationContext {
        return this.container;
    }

    init(argv: string[]): Command {
        try {
            // if nothing was provided, display the help
            if (this.cli.commands.length === 0) {
                throw new CommandError(
                    `The cli ${this.cli.name()} does not contains subcommand`,
                    this.cli
                );
            }
            if (argv.length === 2) {
                throw new CommandError(`[command] is required`, this.cli);
            }
            return this.cli.parse(argv);
        } catch (e) {
            // normal exit using help
            if (e instanceof CommanderError) {
                process.exit(e.exitCode);
            }
            if (e instanceof CommandError) {
                this.displayErrorWithHelp(e.command, e);
                process.exit(1);
            }
            throw e;
        }
    }

    createSubCommand(parent: Command, options: IConsoleOptions): Command {
        const command = parent
            .command(options.name)
            .description(options.description)
            .alias(options.alias);
        return createSubCommand.bind(command)();
    }
}
