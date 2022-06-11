import { IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class ReviewDto {
  @IsNumber()
  rating: number;

  @IsString()
  comment: string;
}
