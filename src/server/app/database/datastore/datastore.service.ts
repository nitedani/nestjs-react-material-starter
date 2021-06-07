import { Datastore } from '@google-cloud/datastore';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

@Injectable()
export class DataStoreService extends Datastore {
  constructor(configService: ConfigService) {
    if (process.env.NODE_ENV !== 'production') {
      let json;
      const keyFilePath = join(cwd(), configService.get('GCP_SA_KEYFILE'));

      try {
        if (!existsSync(keyFilePath)) {
          console.log('GCP_SA_KEYFILE not found');
          process.exit(0);
        }
      } catch (err) {
        console.log('GCP_SA_KEYFILE not found');
        process.exit(0);
      }

      try {
        json = JSON.parse(readFileSync(keyFilePath).toString());
      } catch (error) {
        console.log(error);
        process.exit(0);
      }
      super({
        projectId: json.project_id,
        keyFilename: keyFilePath,
      });
    } else {
      super();
    }
  }

  getKey(entity: any) {
    return entity[this.KEY];
  }
}
