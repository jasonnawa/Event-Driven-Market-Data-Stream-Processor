import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserStockSubscribeDto } from './dto/user-stock-subscribe.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('subscribe')
  async subscribeUserToStock(@Body() dto: UserStockSubscribeDto) {
    return this.userService.toggleUserSubscription(dto);
  }

  @Post('subscribe/status')
  async getUserSubscriptionStatus(@Body() dto: UserStockSubscribeDto) {
    return this.userService.getUserSubscriptionStatus(dto);
  }
}
