import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../database/database.module';
import { List, ListSchema } from './entities/list.entity';
import { ListsService } from './lists.service';

describe('ListsService', () => {
    let service: ListsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])],
            providers: [ListsService],
        }).compile();

        service = module.get<ListsService>(ListsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
