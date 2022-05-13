import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PagingDto {
  @ApiPropertyOptional({ type: Number, default: 1, example: 1 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Expose()
  page?: number = 1;

  @ApiPropertyOptional({ type: Number, default: 10, example: 10 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Expose()
  limit?: number = 10;
}
