import { Injectable } from '@angular/core';
import { MarketingProgram } from '../../../core/models/marketing-program.model';

@Injectable()
export class MarketingProgramStore {
    marketingProgram: MarketingProgram;
    marketingPrograms: MarketingProgram[];

    constructor() {
    }

    setMarketingPrograms(marketingPrograms: MarketingProgram[]): void {
        this.marketingPrograms = marketingPrograms;
    }

    setSelectedMarketingProgram(marketingProgram: MarketingProgram): void {
        this.marketingProgram = marketingProgram;
    }

    getSelectedMarketingProgram(): MarketingProgram {
        return this.marketingProgram;
    }

    getId(): string {
        const program = this.getSelectedMarketingProgram();
        return program && program.id;
    }

    getRollingExpirationDays(): number {
        const program = this.getSelectedMarketingProgram();
        return program && program.rollingExpirationDays;
    }

    getReceiptSubmissionDays(): number {
        const program = this.getSelectedMarketingProgram();
        return program && program.receiptSubmissionDays;
    }

    getTimezone(): string {
        const program = this.getSelectedMarketingProgram();
        return program && program.country && program.country.timezoneOffset;
    }
}

