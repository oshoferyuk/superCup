import { MarketingProgramService } from './marketing-program.service';

describe('MarketingProgramService', () => {
    let sut;
    let Http;
    const URL: string = '/channels';
    beforeEach(() => {
        Http = {
            get: jasmine.createSpy('get')
        };
        sut = new MarketingProgramService(Http);
    });

    describe('check getting marketing programs', () => {

        it('should get marketing programs', () => {
            sut.getMarketingProgram();
            expect(sut.httpService.get).toHaveBeenCalledWith(URL);
        });
    });
});
