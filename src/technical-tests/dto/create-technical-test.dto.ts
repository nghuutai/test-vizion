import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { POSITION } from '../enum/technical-test.enum';

export class CreateTechnicalTestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: POSITION })
  @IsEnum(POSITION)
  position: POSITION;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ type: String, format: 'binary', required: false })
  file?: Express.Multer.File;
}
