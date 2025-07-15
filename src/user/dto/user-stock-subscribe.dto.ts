import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserStockSubscribeDto {
  @IsEmail({}, { message: 'userId must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Stock symbol must not be empty' })
  symbol: string;
}
