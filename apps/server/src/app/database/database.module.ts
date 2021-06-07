import { Module } from '@nestjs/common';
import { DataStoreService } from './datastore/datastore.service';

@Module({
  providers: [DataStoreService],
  exports: [DataStoreService],
})
export class DatabaseModule {}
