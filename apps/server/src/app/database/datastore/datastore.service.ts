import { Datastore } from '@google-cloud/datastore';
import { Injectable, Logger } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class DataStoreService extends Datastore {
  constructor(configService: ConfigService, logger: Logger) {
    if (process.env.NODE_ENV !== 'production') {
      let json;
      const keyFilePath = join(
        cwd(),
        'apps',
        'server',
        configService.get('GCP_SA_KEYFILE'),
      );

      try {
        if (!existsSync(keyFilePath)) {
          logger.error('GCP_SA_KEYFILE not found');
          process.exit(0);
        }
      } catch (err) {
        logger.error('GCP_SA_KEYFILE not found');
        process.exit(0);
      }

      try {
        json = JSON.parse(readFileSync(keyFilePath).toString());
      } catch (error) {
        logger.error(error);
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
