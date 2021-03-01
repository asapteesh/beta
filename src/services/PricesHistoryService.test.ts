import { getAllHistoryMetric } from "./PricesHistoryService";

describe('PriceHistoryService', () => {
    describe('getAllHistoryMetric', () => {
        it('should return a smaller all when the resolution date is in 1 day', () => {
            const metric = getAllHistoryMetric(new Date(1614180307532), new Date(1614266667244));

            expect(metric).toBe('hour');
        })

        it('should return a all based on week points when the resolution date far', () => {
            const metric = getAllHistoryMetric(new Date(1614180307532), new Date(1619266667244));

            expect(metric).toBe('week');
        })

        it('should return a all based on day points when the resolution is within a week', () => {
            const metric = getAllHistoryMetric(new Date(1614180307532), new Date(1614466667244));

            expect(metric).toBe('day');
        })
    })
});
