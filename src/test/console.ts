import { BootstrapConsole } from '../bootstrap/console';
import { ConsoleModuleTestWithDecorators } from './module.decorators';

const bootrap = new BootstrapConsole({
    module: ConsoleModuleTestWithDecorators,
    withContainer: true,
    useDecorators: true
});
bootrap.init().then(app => {
    // do something with app
    bootrap.boot();
});
