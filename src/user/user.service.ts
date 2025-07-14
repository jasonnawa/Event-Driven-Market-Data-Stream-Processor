import { Injectable } from '@nestjs/common';
import { userData } from './user.data';

@Injectable()
export class UserService {
    private userData = userData
    constructor(){}


    async getUsersPerStockSymbol(symbol: string) {
        const users = this.userData[symbol] || []
        return users
    }
}
