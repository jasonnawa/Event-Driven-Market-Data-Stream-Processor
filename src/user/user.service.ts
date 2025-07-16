import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User2 } from './user.schema';
import { UserStockSubscribeDto } from './dto/user-stock-subscribe.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User2.name) private userModel: Model<User2>) { }


    async getUsersPerStockSymbol(symbol: string): Promise<string[]> {
        const users = await this.userModel
            .find({ subscribedStocks: symbol }, { email: 1, _id: 0 })
            .lean();

        return users.map(user => user.email);
    }


    async getUserSubscriptionStatus(dto: UserStockSubscribeDto) {
        const { email, symbol } = dto;
        const user = await this.userModel.findOne({ email });
        return {
            subscribed: user?.subscribedStocks?.includes(symbol) ?? false,
        };
    }


    async toggleUserSubscription(dto: UserStockSubscribeDto) {
        const { email, symbol } = dto;

        const user = await this.userModel.findOne({ email });

        // If user does not exist — create and subscribe
        if (!user) {
            const created = new this.userModel({
                email,
                subscribedStocks: [symbol],
            });
            await created.save();
            return { status: true, message: `${email} subscribed to ${symbol} successfully!`, subscribedStocks: created.subscribedStocks };
        }

        const isAlreadySubscribed = user.subscribedStocks.includes(symbol);

        const updated = await this.userModel.findOneAndUpdate(
            { email },
            isAlreadySubscribed
                ? { $pull: { subscribedStocks: symbol } }
                : { $addToSet: { subscribedStocks: symbol } },
            { new: true },
        );

        return {
            status: true,
            message: isAlreadySubscribed ? `${email} unsubscribed to ${symbol} successfully!` : `${email} subscribed to ${symbol} successfully!`,
            subscribedStocks: updated?.subscribedStocks,
        };
    }
}
