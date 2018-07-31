export const productSelector = {
    PRODUCT_SELECTOR_MODAL: 'product-selector-modal',
    DIALOG_WIDTH: '98%',
    DIALOG_DISABLE_CLOSE: true
};

export enum toggle {
    SECTOR_TOGGLE = 1,
    BRAND_TOGGLE_ON,
    BRAND_TOGGLE_OFF,
    SUB_BRAND_TOGGLE,
    VERSION_TOGGLE,
    FORM_TOGGLE,
    SECTOR_SEARCH,
    BRAND_SEARCH,
    SUB_BRAND_SEARCH,
    VERSION_SEARCH,
    FORM_SEARCH
}

export const optimizationLevel = {
    sector: 'SECTOR',
    category: 'CATEGORY',
    brandGroup: 'BRAND_FAMILY',
    brand: 'BRAND',
    subBrands: 'SUB_BRAND',
    versions: 'ITEM_VERSION',
    forms: 'GLOBAL_FORM'
};
