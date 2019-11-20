import { Console, Command } from '../../decorators';

@Console()
export class ConsoleServiceTest {
    @Command({
        command: 'testCommand <myArgument>',
        alias: 'tc',
        description: 'A command to test decorators'
    })
    public myCommand(myArgument: string) {
        process.stdout.write(myArgument + '\n');
        process.exit(0);
    }
}
