import { DatePickerValidationService } from './date-picker-validation.service';

describe('DatePickerValidationService', () => {
    let sut;
    const URL: string = '/channels';
    beforeEach(() => {
        sut = new DatePickerValidationService();
    });

    describe('date picker validation', () => {

        describe('start', () => {

            it('should have validation start date as current date in future', () => {
                const ret = sut.validityStartChanged({value: '2028-08-10'});

                expect(ret.validityStartDatePickerOptions.disableUntil.year).toEqual((new Date()).getFullYear());
                expect(ret.validityStartDatePickerOptions.disableUntil.month).toEqual((new Date()).getMonth() + 1); // 0-11
                expect(ret.validityStartDatePickerOptions.disableUntil.day).toEqual((new Date()).getDate() - 1); // from yesterday
                expect(ret.startTime).toEqual('00:00:00');
            });

            it('should have validation start date as current date in past', () => {
                const ret = sut.validityStartChanged({value: '2008-08-10'});

                expect(ret.validityStartDatePickerOptions.disableUntil.year).toEqual((new Date()).getFullYear());
                expect(ret.validityStartDatePickerOptions.disableUntil.month).toEqual((new Date()).getMonth() + 1); // 0-11
                expect(ret.validityStartDatePickerOptions.disableUntil.day).toEqual((new Date()).getDate() - 1); // from yesterday
            });

            it('should have validation end date setting current for date in past', () => {
                const ret = sut.validityStartChanged({value: '2008-08-10'});

                expect(ret.validityEndDatePickerOptions.disableUntil.year).toEqual((new Date()).getFullYear());
                expect(ret.validityEndDatePickerOptions.disableUntil.month).toEqual((new Date()).getMonth() + 1); // 0-11
                expect(ret.validityEndDatePickerOptions.disableUntil.day).toEqual((new Date()).getDate()); //from today
            });

            it('should have validation expiry date setting current for date in past', () => {
                const ret = sut.validityStartChanged({value: '2008-08-10'});

                expect(ret.expiryDatePickerOptions.disableUntil.year).toEqual((new Date()).getFullYear());
                expect(ret.expiryDatePickerOptions.disableUntil.month).toEqual((new Date()).getMonth() + 1); // 0-11
                expect(ret.expiryDatePickerOptions.disableUntil.day).toEqual((new Date()).getDate()); // from today
            });

            it('should have validation expiry date setting current for date in future in case validity end will be absent', () => {
                const ret = sut.validityStartChanged({value: '2028-08-10'});

                expect(ret.expiryDatePickerOptions.disableUntil.year).toEqual(2028);
                expect(ret.expiryDatePickerOptions.disableUntil.month).toEqual(8);
                expect(ret.expiryDatePickerOptions.disableUntil.day).toEqual(9);
            });
        });

        describe('end', () => {
            it('should have validation end date equal choosen', () => {
                const ret = sut.validityEndChanged({value: '2028-08-10'});
                expect(ret.expiryDatePickerOptions.disableUntil.year).toEqual(2028);
                expect(ret.expiryDatePickerOptions.disableUntil.month).toEqual(8);
                expect(ret.expiryDatePickerOptions.disableUntil.day).toEqual(10);
            });

            it('should have validation start date SINCE equal choosen', () => {
                const ret = sut.validityEndChanged({value: '2028-08-10'});
                expect(ret.validityStartDatePickerOptions.disableSince.year).toEqual(2028);
                expect(ret.validityStartDatePickerOptions.disableSince.month).toEqual(8);
                expect(ret.validityStartDatePickerOptions.disableSince.day).toEqual(10);
            });
        });

        describe('expiry', () => {
            it('should have validation end date SINCE equal choosen for future', () => {
                const ret = sut.validityExpiryChanged({value: '2028-08-10'}, true);
                expect(ret.validityEndDatePickerOptions.disableSince.year).toEqual(2028);
                expect(ret.validityEndDatePickerOptions.disableSince.month).toEqual(8);
                expect(ret.validityEndDatePickerOptions.disableSince.day).toEqual(10);
            });

            it('should have validation start date equal choosen when end date NOT present', () => {
                const ret = sut.validityExpiryChanged({value: '2028-08-10'});
                expect(ret.validityStartDatePickerOptions.disableSince.year).toEqual(2028);
                expect(ret.validityStartDatePickerOptions.disableSince.month).toEqual(8);
                expect(ret.validityStartDatePickerOptions.disableSince.day).toEqual(10);
            });
        });

    });
});
