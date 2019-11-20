import { BootstrapConsoleServer } from '../bootstrap/server';
import { ConsoleModuleTestWithDecorators } from './app/module.decorators';
// tslint:disable-next-line:no-implicit-dependencies
import { ExpressAdapter } from '@nestjs/platform-express';

const bootrap = new BootstrapConsoleServer({
    module: ConsoleModuleTestWithDecorators,
    withContainer: true,
    useDecorators: true,
    contextOptions: { logger: false },
    httpAdapter: new ExpressAdapter()
});
bootrap.init().then(app => bootrap.boot());
