import { PartialType } from '@nestjs/swagger';

import { CreateProjectTypeDto } from './create-project-type.dto';

export class UpdateProjectTypeDto extends PartialType(CreateProjectTypeDto) {}
