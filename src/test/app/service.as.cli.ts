import { Console, Command } from '../../decorators';

@Console({
    name: 'mycli',
    alias: 'm',
    description: 'A complete cli provided by a service class'
})
export class ConsoleServiceTestAsCli {
    @Command({
        command: 'subcommand <myArgument>',
        alias: 'sub',
        description: 'A sub command to test decorators',
        options: [
            {
                flags: '-o, --optional [value]'
            }
        ]
    })
    public myCommand(myArgument: string, options: any) {
        process.stdout.write(myArgument + `\n`);
        if (options.optional) {
            process.stdout.write(options.optional + `\n`);
        }
        process.exit(0);
    }
}
