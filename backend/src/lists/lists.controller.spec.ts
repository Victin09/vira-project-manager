import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../database/database.module';
import { List, ListSchema } from './entities/list.entity';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

describe('ListsController', () => {
    let controller: ListsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])],
            controllers: [ListsController],
            providers: [ListsService],
        }).compile();

        controller = module.get<ListsController>(ListsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
