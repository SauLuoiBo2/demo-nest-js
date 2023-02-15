import { Module } from '@nestjs/common';
import { HashCodeService } from './hash-code.service';

@Module({
  providers: [HashCodeService],
  exports: [HashCodeService],
})
export class HashCodeModule {}
