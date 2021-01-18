import { PoolBalanceViewModel } from "./PoolBalance";

export enum MarketCategory {
    Stocks = 'stocks',
    Esports = 'esports',
    Meme = 'meme',
    Politics = 'politics',
    Viral = 'viral',
    Crypto = 'crypto',
    Sports = 'sports',
    Startups = 'startups',
    Unknown = 'unknown',
}

export interface MarketViewModel {
    id: string;
    description: string;
    resolutionDate: Date;
    outcomes: PoolBalanceViewModel[];
    volume: string;
    category: (MarketCategory | string)[];
    extraInfo: string;
}
