import { IMyDpOptions, IMyInputFieldChanged, IMyDate } from 'mydatepicker';
import { CalendarData } from '../form-coupon-constructor/form-coupon-constructor.constants';

export class DatePickerValidationService {

    myDatePickerOptions: IMyDpOptions = {
        width: CalendarData.DATEPICKER_WIDTH,
        height: CalendarData.DATEPICKER_HEIGHT,
        inline: CalendarData.DATEPICKER_INLINE,
        editableDateField: CalendarData.DATEPICKER_EDIT,
        dateFormat: CalendarData.DATEPICKER_DATE_FORMAT,
        showClearDateBtn: CalendarData.DATEPICKER_CLEAR_BTN,
        selectorWidth: CalendarData.DATAPICKER_SELECTOR_WIDTH,
        selectorHeight: CalendarData.DATAPICKER_SELECTOR_HEIGHT,
    };

    constructor() { }

    validityStartChanged(date: IMyInputFieldChanged): any {

        const ret: any = {};
        const currentDate = new Date();
        if (date.value !== '' && new Date(date.value) > currentDate) {

            ret.startTime = CalendarData.VALIDITY_START_TIME;
            const [year, month, day] = date.value.split('-');

            let excludeCurrentDay: number = 1;

            if (parseInt(day, 10) === currentDate.getDate()
                && parseInt(month, 10) - CalendarData.DATEPICKER_TIME_ADJUSTER === currentDate.getMonth()
                && parseInt(year, 10) === currentDate.getFullYear()) {
                excludeCurrentDay = 0;
            }
            ret.validityEndDatePickerOptions =
                this.disableDatePicker(
                    ret.validityEndDatePickerOptions,
                    {
                        year: parseInt(year, 10),
                        month: parseInt(month, 10),
                        day: parseInt(day, 10) - excludeCurrentDay
                    });

            ret.expiryDatePickerOptions =
                this.disableDatePicker(
                    ret.expiryDatePickerOptions,
                    {
                        year: parseInt(year, 10),
                        month: parseInt(month, 10),
                        day: parseInt(day, 10) - excludeCurrentDay
                    });

        } else {
            ret.startTime = '';

            ret.validityEndDatePickerOptions =
                this.disableDatePicker(
                    ret.validityEndDatePickerOptions,
                    {
                        year: currentDate.getFullYear(),
                        month: currentDate.getMonth() + 1,
                        day: currentDate.getDate()
                    });

            ret.expiryDatePickerOptions =
                this.disableDatePicker(
                    ret.expiryDatePickerOptions,
                    {
                        year: currentDate.getFullYear(),
                        month: currentDate.getMonth() + 1,
                        day: currentDate.getDate()
                    });
        }

        ret.validityStartDatePickerOptions =
            this.disableDatePicker(
                ret.validityStartDatePickerOptions,
                {
                    year: currentDate.getFullYear(),
                    month: currentDate.getMonth() + CalendarData.DATEPICKER_TIME_ADJUSTER,
                    day: currentDate.getDate() - CalendarData.DATEPICKER_TIME_ADJUSTER
                });

        return ret;
    }

    validityEndChanged(date: IMyInputFieldChanged): any {
        const ret: any = {};
        const currentDate = new Date();
        if (date.value !== '' && new Date(date.value) > currentDate) {
            ret.endDate = date;
            ret.endTime = CalendarData.VALIDITY_END_TIME;
            const [year, month, day] = date.value.split('-');

            ret.expiryDatePickerOptions =
                this.disableDatePicker(
                    ret.expiryDatePickerOptions,
                    {
                        year: parseInt(year, 10),
                        month: parseInt(month, 10),
                        day: parseInt(day, 10)
                    });

            ret.validityStartDatePickerOptions =
                this.disableDatePickerSince(
                    this.disableDatePickerSince,
                    {
                        year: parseInt(year, 10),
                        month: parseInt(month, 10),
                        day: parseInt(day, 10)
                    });
        } else {
            ret.endTime = '';
        }
        return ret;
    }

    validityExpiryChanged(date: IMyInputFieldChanged, endDate: any): any {
        const ret: any = {};
        const currentDate = new Date();
        if (date.value !== '' && new Date(date.value) > currentDate) {
            ret.expiredDate = date;
            const [year, month, day] = date.value.split('-');

            if (!endDate) {

                ret.validityStartDatePickerOptions =
                    this.disableDatePickerSince(
                        this.disableDatePickerSince,
                        {
                            year: parseInt(year, 10),
                            month: parseInt(month, 10),
                            day: parseInt(day, 10)
                        });

                ret.validityEndDatePickerOptions =
                    this.disableDatePicker(
                        ret.validityEndDatePickerOptions,
                        {
                            year: currentDate.getFullYear(),
                            month: currentDate.getMonth() + 1,
                            day: currentDate.getDate()
                        });
            }


            ret.validityEndDatePickerOptions =
                this.disableDatePickerSince(
                    ret.validityEndDatePickerOptions,
                    {
                        year: parseInt(year, 10),
                        month: parseInt(month, 10),
                        day: parseInt(day, 10)
                    });
        }
        return ret;
    }

    private getCopyOfOptions(): IMyDpOptions {
        return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    }

    private disableDatePicker(current: any, disableUntil: { year: number, month: number, day: number }): {} {

        const copy = this.getCopyOfOptions();
        copy.disableUntil = disableUntil;
        return Object.assign({}, current, copy);
    }

    private disableDatePickerSince(current: any, disableSince: { year: number, month: number, day: number }): {} {
        const copy = this.getCopyOfOptions();
        copy.disableSince = disableSince;
        return Object.assign({}, current, copy);
    }
}
