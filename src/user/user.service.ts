import { Injectable } from '@nestjs/common';
import { userData } from './user.data';
import { UserStockSubscribeDto } from './dto/user-stock-subscribe.dto';

@Injectable()
export class UserService {
    private userData = userData
    constructor() { }


    async getUsersPerStockSymbol(symbol: string) {
        const users = this.userData[symbol] || []
        return users
    }

    async getUserSubscriptionStatus(userStockSubscribeDto: UserStockSubscribeDto) {
        return { status: true, message: 'user subscribed to stock' }
    }

    async subscribeUserToStock(userStockSubscribeDto: UserStockSubscribeDto) {
        //TODO: add persistent storage
        const { symbol, email } = userStockSubscribeDto
        return { status: true, message: `${email} subscribed to ${symbol} successfully!` }
    }

    async unsubscribeUserToStock(userStockSubscribeDto: UserStockSubscribeDto) {
        return { status: true, message: 'user unsubscribed successfully!' }
    }

}
