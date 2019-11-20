import { INestApplicationContext } from '@nestjs/common';
import { ConsoleModule } from '../module';
import { ConsoleService, IConsoleService } from '../service';

export interface CommonBootstrapConsoleOptions {
    module: any;
    consoleServiceType?: new (...args: any[]) => IConsoleService;
    withContainer?: boolean;
    useDecorators?: boolean;
    contextOptions?: any;
}

export abstract class AbstractBootstrapConsole<
    A extends INestApplicationContext,
    O extends CommonBootstrapConsoleOptions
> {
    protected service: IConsoleService;
    protected container: A;

    constructor(protected readonly options: O) {}

    protected initService() {
        if (this.options.consoleServiceType) {
            this.service = this.container.get(this.options.consoleServiceType);
        } else {
            this.service = this.container.get(ConsoleService);
        }
        if (
            this.options.withContainer &&
            typeof this.service.setContainer === 'function'
        ) {
            this.service.setContainer(this.container);
        }
        return this;
    }

    async init() {
        this.container = await this.create();
        await this.container.init();
        this.initService();
        if (this.options.useDecorators) {
            this.useDecorators();
        }
        return this.container;
    }

    protected useDecorators() {
        const consoleModule = this.container.get(ConsoleModule);
        consoleModule.scan(this.container, this.options.module);
        return this;
    }

    getService() {
        return this.service;
    }

    boot(argv?: string[]) {
        return this.service.init(!argv ? process.argv : argv);
    }

    abstract create(): Promise<A>;
}
