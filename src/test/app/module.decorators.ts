import { Module } from '@nestjs/common';
import { ConsoleModule } from '../../module';
import { ConsoleServiceTest } from './service';
import { ConsoleServiceTestAsCli } from './service.as.cli';
import { ApplicationManager } from '../../commands/application-manager';

@Module({
    imports: [ConsoleModule],
    providers: [ApplicationManager, ConsoleServiceTest, ConsoleServiceTestAsCli]
})
export class ConsoleModuleTestWithDecorators {}
