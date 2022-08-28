import { IS_PUBLIC_METADATA_KEY } from './../../../settings';
import { SetMetadata } from '@nestjs/common';

export const IsPublic = () => SetMetadata(IS_PUBLIC_METADATA_KEY, true);
