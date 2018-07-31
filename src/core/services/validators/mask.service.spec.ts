import { MaskService } from './mask.service';

describe('MaskService', () => {
    let sut;

    beforeEach(() => {
        sut = new MaskService();
    });

    it('should have mask for only numbers', () => {
        expect(sut.onlyNumberMask()()).toEqual([/\d/]);
    });

    it('should have mask for only decimal numbers', () => {
        expect(sut.onlyDecimalNumberMask()()).toEqual([/\d/]);
    });

    describe('mask for number from 0.00 to 1.00', () => {
        it('should have placeholder with empty line', () => {
            expect(sut.zeroOrOneWithDecimal().placeholderChar).toEqual('\u2000');
        });

        describe('mask', () => {
            it('should block any decimal if value is equal 1', () => {
                expect(sut.zeroOrOneWithDecimal().mask('1')).toEqual([/[1]/]);
            });

            it('should not block any decimal if value is lest then 1', () => {
                expect(sut.zeroOrOneWithDecimal().mask('0')).toEqual([/[0-1]/, /[\\.]/, /\d/, /\d/]);
            });
        });
    });
});
