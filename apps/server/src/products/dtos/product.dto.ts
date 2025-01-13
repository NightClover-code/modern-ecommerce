import { IsString, IsNumber, IsArray } from 'class-validator';

export class ProductDto {
  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsString()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  images!: string[];

  @IsString()
  brand!: string;

  @IsString()
  category!: string;

  @IsNumber()
  countInStock!: number;
}
