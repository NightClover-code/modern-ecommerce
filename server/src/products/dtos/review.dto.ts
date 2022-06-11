import { IsString, IsNumber, Min, Max } from 'class-validator';

export class ReviewDto {
  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;

  @IsString()
  comment: string;
}
