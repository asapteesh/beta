import { gql } from '@apollo/client';
import { subDays, subMonths, subWeeks, differenceInDays } from 'date-fns';
import { MarketViewModel } from '../models/Market';
import { PriceHistoryData } from '../models/PriceHistoryData';
import { graphqlClient } from './GraphQLService';

export enum Period {
    OneDay = '1d',
    OneWeek = '1w',
    OneMonth = '1m',
    ThreeWeeks = '3w',
    All = 'all',
}

export function getAllHistoryMetric(creationDate: Date, endDate: Date): string {
    const diffDays = differenceInDays(endDate, creationDate);

    // Market takes longer than 4 weeks
    if (diffDays > 28) {
        return 'week';
    }

    // Market takes less than 7 days but more than 1 day
    if (diffDays <= 7 && diffDays > 1) {
        return 'day';
    }

    return 'hour';
}

export async function getPricesHistoryByMarketId(market: MarketViewModel, period: Period): Promise<PriceHistoryData[]> {
    try {
        const now = new Date();
        let chosenPeriondDate = new Date();
        let metric = 'month';

        switch(period) {
            case Period.OneDay:
                chosenPeriondDate = subDays(now, 1);
                metric = 'hour'
                break;
            case Period.OneWeek:
                chosenPeriondDate = subWeeks(now, 1);
                metric = 'day';
                break;
            case Period.ThreeWeeks:
                chosenPeriondDate = subWeeks(now, 3);
                metric = 'day';
                break;
            case Period.OneMonth:
                chosenPeriondDate = subMonths(now, 1);
                metric = 'day';
                break;
            case Period.All:
                chosenPeriondDate = new Date(0);
                metric = getAllHistoryMetric(market.creationDate ?? new Date(0), market.resolutionDate);
                break;
        }

        const result = await graphqlClient.query({
            fetchPolicy: 'network-only',
            query: gql`
                query MarketPriceHistory($marketId: String!, $beginTimestamp: String!, $dateMetric: DateMetric) {
                    history: getPriceHistory(poolId: $marketId, beginTimestamp: $beginTimestamp, dateMetric: $dateMetric) {
                        pointKey
                        dataPoints {
                            outcome
                            price
                        }
                    }
                }
            `,
            variables: {
                marketId: market.id,
                beginTimestamp: chosenPeriondDate.getTime().toString(),
                dateMetric: metric,
            }
        });

        return result.data.history;
    } catch (error) {
        console.error('[getMarketById]', error);
        return [];
    }
}
