import { MarketingProgramStore } from './marketing-program.store';

describe('MarketingProgramStore', () => {
    let sut;
    const marketingProgram = {
        id: Math.random(),
        highValueOfferThreshold: 100,
        rollingExpirationDays: Math.random(),
        receiptSubmissionDays: Math.random(),
        country: {
            timezoneName: '+03:00',
            timezoneOffset: '+03:00'
        }
    };
    const marketingPrograms = [
        marketingProgram, {
            highValueOfferThreshold: 200
        }
    ];

    beforeEach(() => {
        sut = new MarketingProgramStore();
    });

    describe('set marketing programs', () => {
        it('should set marketing programs', () => {
            sut.setMarketingPrograms(marketingPrograms);
            expect(sut.marketingPrograms).toEqual(marketingPrograms);
        });
    });

    describe('set marketing program', () => {
        it('should set marketing program', () => {
            sut.setSelectedMarketingProgram(marketingProgram);
            expect(sut.marketingProgram).toEqual(marketingProgram);
        });
    });

    describe('when has selected program', () => {
        beforeEach(() => {
            sut.setSelectedMarketingProgram(marketingProgram);
        });

        it('should get marketing program', () => {
            expect(sut.getSelectedMarketingProgram()).toEqual(sut.marketingProgram);
        });

        it('should get id', () => {
            expect(sut.getId()).toEqual(marketingProgram.id);
        });

        it('should get rolling expiration days', () => {
            expect(sut.getRollingExpirationDays()).toEqual(marketingProgram.rollingExpirationDays);
        });

        it('should get receipt submission days', () => {
            expect(sut.getReceiptSubmissionDays()).toEqual(marketingProgram.receiptSubmissionDays);
        });

        it('should get country timezone', () => {
            expect(sut.getTimezone()).toEqual('+03:00');
        });
    });
});
