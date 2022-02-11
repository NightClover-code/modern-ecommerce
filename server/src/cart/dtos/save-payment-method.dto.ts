import { IsString } from 'class-validator';

export class SavePaymentMethodDto {
  @IsString()
  paymentMethod: string;
}
