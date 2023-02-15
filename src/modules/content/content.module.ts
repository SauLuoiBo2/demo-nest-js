import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { FileModule } from '@configs/file/file.module';

@Module({
  providers: [ContentResolver, ContentService],
  imports: [FileModule],
})
export class ContentModule {}
