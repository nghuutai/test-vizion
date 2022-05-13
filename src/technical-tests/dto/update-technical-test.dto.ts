import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { POSITION } from '../enum/technical-test.enum';
import { CreateTechnicalTestDto } from './create-technical-test.dto';

export class UpdateTechnicalTestDto extends PartialType(
  CreateTechnicalTestDto,
) {}
