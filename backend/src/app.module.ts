import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/vira-project-manager'),
        UsersModule,
        ProjectsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
