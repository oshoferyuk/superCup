import { offerFields } from '../../../modules/coupon-constructor/form-coupon-constructor/form-coupon-constructor.constants';

export const en = {
    marketingProgram: {
        currency: {
            GBP: '£',
            USD: '$',
            EUR: '€'
        }
    },

    offer: {
        statuses: {
            DATA_NEEDED: 'Data Needed',
            IMAGE_NEEDED: 'Image Needed',
            CREATED: 'Created',
            DISABLED: 'Disabled',
            ACTIVE: 'Active',
            UPCOMING: 'Upcoming',
            OUT_OF_STOCK: 'Out of Stock',
            EXPIRED: 'Expired',
            DELETED: 'Deleted'
        },

        sampleValues: {
            SINGLE_USE: 'Single Use',
            MULTIPLE_USE: 'Multiple Use',
            FULL_SIZE: 'Full Pack',
        },

        errors: {
            INCENTIVE_ID_NOT_ASSIGNED: 'IncentiveID is not assigned. Please try again later.',
            publishRequired: 'Please fill all required fields'
        },

        dialogs: {
            switchType: {
                message: 'Please confirm creation another campaign within the same Marketing Program. Your input data will be lost',
            },
            deleteOffer: {
                message: 'Please confirm the status change. You will not be able to work with this offer anymore'
            },
            export: {
                message: 'Please select printable campaigns to export to Excel.'
            },
            error: {
                title: 'Server Error',
                message: 'There was an error while submitting your request, please try again'
            }
        },
        preview: {
            sample: 'Sample Preview',
            coupon: 'Coupon Preview'
        }
    },

    productSelector: {
        errorMessages: {
            searchFieldLeastThree: 'Please enter at least three letters'
        }
    },

    loginForm: {
        address: 'Enter Address',
        password: 'Password',
        loginHeaderTitle: 'Offer Management system',
        signTitle: 'Please Choose Your Destination Point',
        credentialsTitle: 'Flipp Coupon Management Platform',

        buttons: {
            loginFederation: 'Login with Federation',
            loginFlipp: 'Admin',
            login: 'Login',
        }
    },

    errorForm: {
        buttons: {
            ok: 'OK'
        },
        serverDown: 'Login error occurred. Please try again later.',
        unAuthorized: 'Partner application does not allow self-registration.',
        defaultMessage: 'Login error occurred. Please try again later.'
    },

    buttons: {
        disable: 'Disable',
        delete: 'Delete',
        publish: 'Publish Campaign',
        saveDraft: 'Save Draft',
        productSelector: 'Product Selector',
        upload: 'Upload',
        cancel: 'Cancel',
        create: 'Create',
        confirm: 'Confirm'
    },

    listDropDown: {
        editOption: 'Edit Campaign',
        copyOption: 'Duplicate Campaign'
    },

    labels: {
        requiredFields: 'Required Fields',
        listOfProducts: 'List of products for selection',
        requiredPurchase: 'Required Purchase GTINs',
        sampleGtins: 'Sample | GTINs',
        [offerFields.type]: 'Type',
        [offerFields.language]: 'Language',
        [offerFields.currency]: 'Currency',
        [offerFields.printable]: 'Printable',
        [offerFields.offerPrintingHouseID]: 'Offer printing House ID',
        [offerFields.eanNumber]: 'EAN Number',
        [offerFields.highValue]: 'High Value',
        [offerFields.minimumPurchasePrice]: 'Minimum Purchase Price',
        [offerFields.ncnCode]: 'NCH Code',
        [offerFields.offerDescription]: 'Offer Description',
        [offerFields.productBrandGroup]: 'Product Brand Group',
        [offerFields.offerSummary]: 'Offer Summary',
        [offerFields.productImage]: 'Product Image',
        [offerFields.sampleValue]: 'Sample Value',
        [offerFields.couponValue]: 'Coupon Value',
        [offerFields.printableCouponImage]: 'Printable Coupon Image',
        [offerFields.expiry]: 'Expiry Type',
        [offerFields.validityStart]: 'Validity Start Date',
        [offerFields.validityEnd]: 'Validity End Date',
        [offerFields.fixedExpiryDate]: 'Fixed Expiry Date',
        [offerFields.rollingExpiryDays]: 'Rolling Expiry Days',
        [offerFields.targeted]: 'Targeted',
        [offerFields.targetConsumerSegments]: 'Target Consumer Segments',
        [offerFields.subdays]: 'Receipt Submission Days',
        [offerFields.distributionQuantity]: 'Distribution Quantity',
        [offerFields.redemptionRate]: 'Estimated redemption rate',
        [offerFields.budgetName]: 'Budget Name',
        [offerFields.budgetIONumber]: 'Budget IO #',
        [offerFields.requiredPurchaseQuantity]: 'Required Purchase Quantity',
        [offerFields.purchaseGtins]: 'Required Purchase GTINs',
        [offerFields.samplePartNumber]: 'Sample Part Number',
        [offerFields.lineOfBusiness]: 'Line Of Business',
    },

    placeholders: {
        enterSegment: 'Enter a segment',
        enterLimit: 'Enter Limit',
        enterValue: 'Enter Value',
        enterText: 'Enter Text',
        enterNumber: 'Enter Number',
        enterDecimal: 'Enter Decimal',
        enterPrice: 'Enter price',
        chooseAnOption: 'Choose an option',
        shortOfferDescription: 'Enter short description of the offer',
        productDescription: 'Product description',
        urlOfImage: 'HTTPS URL of image',
        startDate: 'Start Date',
        startDateHeader: 'Validity Start Date',
        expiryDateHeader: 'Fixed Expiry Date',
        endDate: 'End Date',
        endDateHeader: 'Validity End Date',
        budgetName: 'Enter Budget Name',
        BudgetIO: 'Enter Budget IO #',
        productsList: 'Products list will be here',
        nchCode: 'Enter Clearing House ID',
        offerIdentifier: 'Enter Offer Identifier',
        eanNumber: 'Enter EAN Number',
    },

    filterTypes:  {
        audienceSegments: 'Segments',
        campaignStatus: 'Campaign Status',
        categories: 'Categories',
        brands: 'Brands'
    }
};
