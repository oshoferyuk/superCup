import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

import { OfferTab } from '../models/tabs.enum';
import { OfferList, SelectList } from '../models/offer-list.model';
import { OfferListService } from '../offer-list.service';
import { OfferFilterService } from '../offer-filter.service';
import { OfferListStore } from '../offer-list.store';
import { MaskService } from '../../../../core/services/validators/mask.service';
import { OfferSelectionService } from '../offer-selection.service';
import { ExportDialogService } from './export-dialog.service';

@Component({
    selector: 'fp-tabs-coupon-campaign',
    templateUrl: './tabs-coupon-campaign.component.html',
    styleUrls: ['./tabs-coupon-campaign.component.scss'],
    providers: [
        ExportDialogService
    ]
})
export class TabsCouponCampaignComponent implements OnInit, OnDestroy {
    isExpanded: boolean = false;
    showApplyFilterButton: boolean = false;
    onlyNumberMask: RegExp[];
    activeTab: OfferTab = OfferTab.ALL;
    offerTab: any = OfferTab;
    totalAll: number = 0;
    totalDraft: number = 0;
    totalUpcoming: number = 0;
    totalActive: number = 0;
    totalExpired: number = 0;

    selectList: SelectList[] = [
        {value: 'print-house-extract', viewValue: 'Print House Extract'}
    ];

    @Output() clickFiltersButton: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() getSearchOffer: EventEmitter<any> = new EventEmitter();
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
            private offerFilterService: OfferFilterService,
            private offerListService: OfferListService,
            private offerListStore: OfferListStore,
            private maskService: MaskService,
            private offerSelectionService: OfferSelectionService,
            private exportDialogService: ExportDialogService
    ) {
    }

    ngOnInit(): void {
        this.clickFiltersButton.emit(this.isExpanded);
        this.onlyNumberMask = this.maskService.onlyNumberMask();
        this.offerListStore.onUpdate()
                .takeUntil(this.ngUnsubscribe)
                .subscribe(data => this.updateTabsData(data));
        this.offerFilterService.isSomeFiltersSelected()
                .takeUntil(this.ngUnsubscribe)
                .subscribe(data => this.showApplyFilterButton = data);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    applyFilters(): void {
        this.offerListService.getOffers();
    }

    expandFilters(): void {
        this.isExpanded = !this.isExpanded;
        this.clickFiltersButton.emit(this.isExpanded);
    }

    isShowButton(): boolean {
        return this.isExpanded && this.showApplyFilterButton;
    }

    searchChange(search: any): void {
        this.offerListService.getOffers({campaignId: search.value});
    }

    isActiveTab(activeTab: OfferTab): boolean {
        return this.activeTab === activeTab;
    }

    changeTab(activeTab: OfferTab): void {
        const param = {tab: activeTab};
        this.offerListService.getOffers(param);
    }

    downloadReport(): void {
        const ids: string[] = [];
        this.offerSelectionService.getSelectedPrintableOfferIds()
            .forEach((id) => {
                ids.push(`id=${id}`);
            });
        if (ids.length) {
            this.offerListService.exportOffers(ids.join('&'));
        } else {
            this.exportDialogService.showExportDialog();
        }
    }

    private updateTabsData(offerList: OfferList): void {
        this.activeTab = offerList.tab;
        this.totalAll = offerList.totals[OfferTab.ALL];
        this.totalDraft = offerList.totals[OfferTab.DRAFT];
        this.totalUpcoming = offerList.totals[OfferTab.UPCOMING];
        this.totalActive = offerList.totals[OfferTab.ACTIVE];
        this.totalExpired = offerList.totals[OfferTab.EXPIRED];
    }
}
