import { SetMetadata } from '@nestjs/common';
import { StatusE, MetaAuthKey } from './status.enum';

const { STATUS_KEY } = MetaAuthKey;
export const Status = (...status: StatusE[]) => SetMetadata(STATUS_KEY, status);
