import { Test, TestingModule } from '@nestjs/testing';
import { ConsoleModule } from '../module';
import { ConsoleService } from '../service';

let mod: TestingModule;
let service: ConsoleService;

beforeEach(async () => {
    mod = await Test.createTestingModule({
        imports: [ConsoleModule]
    }).compile();
    service = mod.get<ConsoleService>(ConsoleService);
});

/**
 * Step to tests
 * Root Command
 * Sub Commands
 * No args
 * No command
 * Unknown Command
 */

describe('ConsoleService', () => {
    it('should set the container in the service and return the service', () => {
        expect(service.setContainer(mod)).toBeInstanceOf(ConsoleService);
    });

    it('should have a cli defined', () => {
        const cli = service.getCli();
        expect(cli).toBeDefined();
        expect(cli).toBeInstanceOf(commander.Command);
    });
});

describe('Command', () => {
    let mockExit: jest.SpyInstance;
    let mockLog: jest.SpyInstance;
    let cli: ICommand;
    beforeEach(() => {
        cli = service.getCli();
        // mockExit = jest.spyOn(process, 'exit').mockImplementation();
        // mockLog = jest.spyOn(process.stdout, 'write').mockImplementation();
    });
    afterEach(() => {
        // mockExit.mockRestore();
        // mockLog.mockRestore();
    });
    // it('should display the help for empty command', () => {
    //     service.init([process.argv0, 'console']);
    //     expect(mockLog).toHaveBeenCalledTimes(1);
    //     expect(mockLog.mock.calls[0][0]).toContain('Usage:  [options]');
    //     expect(mockExit).toHaveBeenCalled();
    // });
    it('should display an error for unknown command', () => {
        cli.command('test')
            .description('dddd')
            .action(jest.fn());

        const com = service.init([process.argv0, 'console', 'qsdqsd']);
        console.log(com);

        // expect(mockLog).toHaveBeenCalled();
        // expect(mockLog.mock.calls[0][0]).toContain(
        //     'Unknown command "unknowcommand"'
        // );
        // expect(mockExit).toHaveBeenCalled();
    });

    // it('should display the help of a command', () => {
    //     const cli = service.getCli();

    //     const mockCommand = jest.fn();
    //     cli.command('world').action(mockCommand);

    //     // create mock on console.error, because commander will continue if the process.exit is mocked.
    //     const mockLogError = jest.spyOn(console, 'error').mockImplementation();
    //     const mockExit = jest.spyOn(process, 'exit').mockImplementation();
    //     const mockLog = jest
    //         .spyOn(process.stdout, 'write')
    //         .mockImplementation();

    //     service.init([process.argv0, 'console', '--help']);
    //     expect(mockLog).toHaveBeenCalledTimes(1);
    //     expect(mockLog.mock.calls[0][0]).toContain('Usage:');
    //     expect(mockLog.mock.calls[0][0]).toContain('world');
    //     expect(mockExit).toHaveBeenCalled();

    //     mockExit.mockRestore();
    //     mockLog.mockRestore();
    //     mockLogError.mockRestore();
    // });

    // it('should display the help if no command was specified', () => {
    //     const cli = service.getCli();

    //     const mockCommand = jest.fn();
    //     cli.command('world')
    //         .description('Test the cli')
    //         .action(mockCommand);

    //     // create mock on console.error, because commander will continue if the process.exit is mocked.
    //     const mockLogError = jest.spyOn(console, 'error').mockImplementation();
    //     const mockExit = jest.spyOn(process, 'exit').mockImplementation();
    //     const mockLog = jest
    //         .spyOn(process.stdout, 'write')
    //         .mockImplementation();

    //     service.init([process.argv0, 'console']);
    //     expect(mockLog).toHaveBeenCalledTimes(1);
    //     expect(mockLog.mock.calls[0][0]).toContain('Usage:');
    //     expect(mockLog.mock.calls[0][0]).toContain('world');
    //     expect(mockLog.mock.calls[0][0]).toContain('Test the cli');
    //     expect(mockExit).toHaveBeenCalled();

    //     mockExit.mockRestore();
    //     mockLog.mockRestore();
    //     mockLogError.mockRestore();
    // });

    // it('should forward to subCommands and execute them', () => {
    //     const mockExit = jest.spyOn(process, 'exit').mockImplementation();
    //     const mockLog = jest
    //         .spyOn(process.stdout, 'write')
    //         .mockImplementation();
    //     const cli = service.getCli();

    //     const prog = service.subCommands(cli, {
    //         name: 'hello',
    //         description: 'A test cli'
    //     });

    //     const mockCommand = jest.fn();

    //     prog.command('me <value>')
    //         .description('Test the cli')
    //         .action(mockCommand);

    //     service.init([process.argv0, 'console', 'hello', 'me', 'everybody']);
    //     expect(mockCommand).toHaveBeenCalledTimes(1);

    //     const mockCommand2 = jest.fn();
    //     prog.command('you <value>')
    //         .description('Test the cli')
    //         .action(mockCommand2);

    //     service.init([process.argv0, 'console', 'hello', 'you', 'everybody']);
    //     expect(mockCommand2).toHaveBeenCalledTimes(1);
    //     mockExit.mockRestore();
    //     mockLog.mockRestore();
    // });

    // it('should throw an error if a parent command with args is forwarded', () => {
    //     const cli = service.getCli();
    //     expect(() =>
    //         service.subCommands(service.getCli(), {
    //             name: 'hello <world>',
    //             description: 'A failing cli'
    //         })
    //     ).toThrow(
    //         'Sub commands cannot be applied to command with explicit args'
    //     );
    // });
});
