import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { List, ListSchema } from './entities/list.entity';
import { ProjectsModule } from '../projects/projects.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]), forwardRef(() => ProjectsModule)],
    controllers: [ListsController],
    providers: [ListsService],
    exports: [ListsService],
})
export class ListsModule {}
