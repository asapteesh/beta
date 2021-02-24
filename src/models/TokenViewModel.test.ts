import { generateTokenName } from "./TokenViewModel";

describe('TokenViewModel', () => {
    describe('generateTokenName', () => {
        it('should show LPP when inserting the name Liquidity Provider Token', () => {
            const tokenName = generateTokenName('Liquidity Provider Token');

            expect(tokenName).toBe('LPT');
        });
    });
});
