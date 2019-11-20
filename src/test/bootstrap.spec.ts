import { ConsoleModuleTest } from './module';
import { BootstrapConsole } from '../bootstrap';
import { NestApplicationContext } from '@nestjs/core';
import { ConsoleService } from '../service';

describe('BootstrapConsole', () => {
    beforeAll(() => {});
    it('Should init the application context', async () => {
        const bootstrap = await BootstrapConsole.init({
            module: ConsoleModuleTest
        });

        expect(bootstrap).toHaveProperty('app');
        expect(bootstrap.app).toBeInstanceOf(NestApplicationContext);
        expect(bootstrap).toHaveProperty('boot');
    });

    it('Should init the application context with container', async () => {
        const bootstrap = await BootstrapConsole.init({
            module: ConsoleModuleTest,
            withContainer: true
        });

        expect(bootstrap).toHaveProperty('app');
        expect(bootstrap.app).toBeInstanceOf(NestApplicationContext);
        expect(bootstrap).toHaveProperty('boot');

        // get the service and check the container
        const service = bootstrap.app.get(ConsoleService);
        expect(service.getContainer()).toBe(bootstrap.app);
    });
});
