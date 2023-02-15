import { SetMetadata } from '@nestjs/common';
import { MetaAuthKey } from '../role/roles.enum';

const { IS_PUBLIC_KEY } = MetaAuthKey;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
