import { Country } from './country.model';

export class MarketingProgram {
    name: string;
    country: Country;
    id: string;
    receiptSubmissionDays: number;
    marketingProgramId: string;
    createdTimestamp: string;
    updatedTimestamp: string;
    rollingExpirationDays: number;
    minimumPayoutAmount: number;
    highValueThreshold: number;
    languages: any[];
}
