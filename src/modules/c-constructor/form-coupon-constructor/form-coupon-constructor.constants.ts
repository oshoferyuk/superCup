import { IMyDayLabels, IMyDpOptions, IMyMonthLabels } from 'mydatepicker';

export class CalendarData {
    public static VALIDITY_START_TIME: string = '00:00:00';
    public static VALIDITY_START_MS_TIME: string = '000';
    public static VALIDITY_END_TIME: string = '23:59:59';
    public static VALIDITY_END_MS_TIME: string = '999';
    public static EXPIRY_FIXED: string = 'FIXED';
    public static EXPIRY_ROLLING: string = 'ROLLING';
    public static DATEPICKER_DATE_FORMAT: string = 'yyyy-mm-dd';
    public static DATEPICKER_HEIGHT: string = '31px';
    public static DATEPICKER_WIDTH: string = '186px';
    public static DATAPICKER_SELECTOR_WIDTH: string = '280px';
    public static DATAPICKER_SELECTOR_HEIGHT: string = '257px';
    public static DATEPICKER_INLINE: boolean = false;
    public static DATEPICKER_TIME_ADJUSTER: number = 1;
    public static DATEPICKER_EDIT: boolean = false;
    public static DATEPICKER_CLEAR_BTN: boolean = false;
    public static DATEPICKER_DAY_LABELS: IMyDayLabels = {
        su: 'Su',
        mo: 'Mo',
        tu: 'Tu',
        we: 'We',
        th: 'Th',
        fr: 'Fr',
        sa: 'Sa'
    };
    public static DATEPICKER_FIRST_DAY_OF_WEEK: string = 'mo';
    public static DATEPICKER_SUN_HIGHLIGHT: boolean = false;
    public static DATEPICKER_MONTH: IMyMonthLabels = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    };
}

export const offerTypes = {
    coupon: 'coupon',
    sample: 'sample'
};

export const offerFields = {
    id: 'id',
    type: 'type',
    status: 'status',
    marketingProgram: 'channelId',
    incentiveId: 'incentiveId',
    // informationTab
    language: 'language',
    currency: 'currency',
    printable: 'printable',
    offerPrintingHouseID: 'offerPrintingHouseID',
    eanNumber: 'eanNumber',
    highValue: 'highValue',
    minimumPurchasePrice: 'minimumPurchasePrice',
    ncnCode: 'clearingCode',
    couponValue: 'value',
    requiredPurchaseQuantity: 'requiredPurchaseQuantity',
    offerDescription: 'productDescription',
    productBrandGroup: 'brand',
    offerSummary: 'summary',
    productImage: 'imageUrl',
    printableCouponImage: 'printableCouponImage',
    sampleValue: 'samplePartTypeCode',
    // distributionTab
    expiry: 'expiryType',
    validityStart: 'validityStart',
    validityEnd: 'validityEnd',
    fixedExpiryDate: 'fixedExpiration',
    rollingExpiryDays: 'rollingExpirationDays',
    targeted: 'targeted',
    targetConsumerSegments: 'consumerSegments',
    subdays: 'subdays',
    purchaseQuantity: 'purchaseQuantity',
    redemptionRate: 'estimatedRedemptionRate',
    budgetName: 'budgetName',
    budgetIONumber: 'budgetCode',
    lineOfBusiness: 'lineOfBusiness',
    distributionQuantity: 'quantityStart',
    purchaseGtins: 'itemGtins',
    selectedProductsSummary: 'selectedProductsSummary',
    validityStartTime: 'validityStartTime',
    validityEndTime: 'validityEndTime',
    samplePartNumber: 'partBarcode',
    clippedQuantity: 'clippedQuantity',
    itemUuids: 'itemUuids',
    lastCatalogLevel: 'lastCatalogLevel',
};

export const offerTabTypes = {
    offerInformation: 'OFFER_INFORMATION',
    distributionDetails: 'DISTRIBUTION_DETAILS'
};

export const lineOfBusinessTypes = [
    {value: 'DOSING', viewValue: 'Dosing'},
    {value: 'FEM_CARE', viewValue: 'FemCare'},
];
