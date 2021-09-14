import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { List, ListSchema } from './entities/list.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])],
    controllers: [ListsController],
    providers: [ListsService],
})
export class ListsModule {}
