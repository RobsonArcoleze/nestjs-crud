import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Max(10)
  @Min(0)
  limit: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  page: number = 0;

  public get skip(): number {
    return this.page * this.limit;
  }
}
