import { Module, INestApplicationContext } from '@nestjs/common';
import { COMMANDER_SERVICE_TOKEN } from './constants';
import { ConsoleScanner } from './scanner';
import { ConsoleService } from './service';
import commander = require('commander');

const cliProvider = {
    provide: COMMANDER_SERVICE_TOKEN,
    useValue: commander
};

@Module({
    providers: [cliProvider, ConsoleService],
    exports: [ConsoleService]
})
export class ConsoleModule {
    protected scanner: ConsoleScanner = new ConsoleScanner();

    constructor(protected readonly service: ConsoleService) {}

    public scan(app: INestApplicationContext, includedModules?: any[]) {
        const scanResponse = this.scanner.scan(app, includedModules);
        const cli = this.service.getCli();
        scanResponse.forEach(({ methods, instance, metadata }) => {
            if (metadata.name) {
                instance._cli = this.service.createSubCommand(cli, metadata);
            } else {
                instance._cli = cli;
            }
            for (const method of methods) {
                const command = instance._cli
                    .command(method.metadata.command)
                    .description(method.metadata.description)
                    .alias(method.metadata.alias);
                if (Symbol.iterator in Object(method.metadata.options)) {
                    for (const opt of method.metadata.options) {
                        command.option(
                            opt.flags,
                            opt.description,
                            opt.fn,
                            opt.defaultValue
                        );
                    }
                }
                command.action(instance[method.name].bind(instance));
            }
        });
    }
}
