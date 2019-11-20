import { Command } from 'commander';

export class CommandError extends Error {
    constructor(message: string, readonly command: Command) {
        super(message);
    }
}

function listen(this: Command, args: string[], unknown: string[]) {
    // throw an error if the sub command is not recognized
    if (!this.parent) {
        console.log('Its a root not found command');
        throw new CommandError(`unknown scommand "${args[0]}"`, this);
    } else {
        console.log('PARENT', this.parent);
    }

    // display the help if no argument(in fact no sub commands) has been provided
    if (args.length === 0) {
        throw new CommandError(`command is required`, this);
    }

    // Trigger any releated sub command events passing the unknown args from parent
    const commandArgs = this.parseOptions(unknown);
    console.log('commandArgs', commandArgs);
    this.parseArgs(args, commandArgs.unknown);

    // Finally, throw an error if nothing has been done
    throw new CommandError(`unknown command "${args[0]}"`, this);
}

export function createSubCommand(this: Command): Command {
    if (this._args.length > 0) {
        throw new Error(
            'Sub commands cannot be applied to command with explicit args'
        );
    }
    const parent: Command = this.parent;
    const name = this.name();
    // register all named events now
    // this will prevent commander to call the event command:*
    if (name !== '') {
        // console.log('Command Binded', 'command:' + name);
        parent.on('command:' + name, (args: string[], unknown: string[]) => {
            // console.log('Trigger child parser', name, args, unknown);
            listen.bind(this)(args, unknown);
        });
    } else {
        console.log('Yes it taken');
    }
    const alias = this.alias();
    if (alias) {
        // console.log('Command Alias Binded', 'command:' + alias);
        parent.on('command:' + alias, (args: string[], unknown: string[]) => {
            // console.log('Trigger alias parser', alias, args, unknown);
            listen.bind(this)(args, unknown);
        });
    }
    parent.on('command:*', (args: string[], unknown: string[]) => {
        // console.log('Trigger root parser', parent._name, args, unknown);
        listen.bind(parent)(args, unknown);
    });

    return this;
}
