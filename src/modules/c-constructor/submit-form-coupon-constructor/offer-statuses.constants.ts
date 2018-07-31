export enum offerStatuses {
    dataNeeded = 'DATA_NEEDED',
    imageNeeded = 'IMAGE_NEEDED',
    created = 'CREATED',
    disabled = 'DISABLED',
    upcoming = 'UPCOMING',
    outOfStock = 'OUT_OF_STOCK',
    expired = 'EXPIRED',
    deleted = 'DELETED',
    active = 'ACTIVE'
}

export const publishedStatuses: string[] = [
    <string>offerStatuses.active,
    <string>offerStatuses.upcoming,
];

export const saveDraftStatuses: string[] = [
    <string>offerStatuses.dataNeeded,
    <string>offerStatuses.imageNeeded,
    <string>offerStatuses.created,
];
