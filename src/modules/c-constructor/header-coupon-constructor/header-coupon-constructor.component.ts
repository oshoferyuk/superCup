import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketingProgram } from '../../../core/models/marketing-program.model';
import { mainRouting } from '../../main/main-routing.constants';
import { ConsumerSegmentsService } from '../consumer-segments/consumer-segments.service';
import { offerFields } from '../form-coupon-constructor/form-coupon-constructor.constants';
import { offerStatuses } from '../submit-form-coupon-constructor/offer-statuses.constants';

@Component({
    selector: 'fp-header-coupon-constructor',
    templateUrl: './header-coupon-constructor.component.html',
    styleUrls: ['./header-coupon-constructor.component.scss']
})
export class HeaderCouponConstructorComponent implements OnInit {
    @Input() marketingPrograms: MarketingProgram[];
    @Input() status: any;
    @Input() form: FormGroup;
    @Output() onSetMarketingProgram: EventEmitter<MarketingProgram> = new EventEmitter();

    private marketingProgramDisabledMap: any = {
        [offerStatuses.deleted]: [offerStatuses.deleted],
        [offerStatuses.upcoming]: [offerStatuses.upcoming],
        [offerStatuses.active]: [offerStatuses.active],
    };

    selectedMarketingProgram: MarketingProgram = null;

    constructor(
        private router: Router,
        private consumerSegmentsService: ConsumerSegmentsService,
    ) {
    }

    ngOnInit(): void {
        const form = this.form.getRawValue();
        const currentForm = form[form.type];
        const marketingProgramId = currentForm[offerFields.marketingProgram];
        const defaultMarketingProgram = this.marketingPrograms
            .find(mk => mk.id === marketingProgramId);
        if (defaultMarketingProgram) {
            this.selectedMarketingProgram = defaultMarketingProgram;
            this.onSetMarketingProgram.emit(this.selectedMarketingProgram);
            return;
        }
        this.selectedMarketingProgram = this.marketingPrograms[0];
        this.setMarketingProgramInitial();
    }

    setMarketingProgram(): void {
        const form = this.form.getRawValue();
        const currentForm = <FormGroup>this.form.get(form.type);
        const currentFormValues = currentForm.getRawValue();
        const targetConsumerSegments = currentForm.get(offerFields.targetConsumerSegments);

        if (currentFormValues[offerFields.targeted]) {
            targetConsumerSegments.reset([]);
        } else {
            targetConsumerSegments.reset(null);
        }

        this.setMarketingProgramInitial();
    }

    navToCampaign(): void {
        this.router.navigate([mainRouting.campaign]);
    }

    isMarketingProgramDisabled(): boolean {
        return this.marketingProgramDisabledMap[this.status];
    }

    private setMarketingProgramInitial(): void {
        this.onSetMarketingProgram.emit(this.selectedMarketingProgram);
        this.consumerSegmentsService.getConsumerSegments(this.selectedMarketingProgram.id);
    }
}
