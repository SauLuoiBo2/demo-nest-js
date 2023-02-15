import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { v4 } from 'uuid';

const config = {
  replacement: '-',
  lower: true,
};

@Injectable()
export class SlugService {
  slugify(slug: string): string {
    return slugify(slug, config);
  }

  replacement(): string {
    return config.replacement;
  }

  random(slug: string): string {
    const uid = v4().split('-')[0];
    const slugRan = this.slugify(slug) + this.replacement() + uid;
    return slugRan;
  }
}
