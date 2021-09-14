import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { IssuesModule } from './issues/issues.module';
import { ListsModule } from './lists/lists.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [DatabaseModule, UsersModule, ProjectsModule, AuthModule, IssuesModule, ListsModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
