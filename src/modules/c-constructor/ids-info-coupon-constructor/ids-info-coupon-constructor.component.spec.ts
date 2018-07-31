import { IdsInfoCouponConstructorComponent } from './ids-info-coupon-constructor.component';
import { Observable } from 'rxjs/Observable';
import { fakeAsync, tick } from '@angular/core/testing';

describe('IdsInfoCouponConstructorComponent', () => {
    let sut;
    let ChangeDetectorRef;

    const value = Symbol('type');
    const id = Symbol('id');
    const offer = {
        incentiveId: Symbol('incentiveId')
    };

    beforeEach(() => {
        ChangeDetectorRef = {
            markForCheck: jasmine.createSpy('markForCheck')
        };

        sut = new IdsInfoCouponConstructorComponent(ChangeDetectorRef);

        sut.form = {
            offer: {
                valueChanges: Observable.timer(1).map(() => true)
            },
            value: {id},
            get: jasmine.createSpy('getType').and
                .callFake(() => sut.form.offer),
            getRawValue: jasmine.createSpy('getRawValue').and.returnValue({
                id,
                offer,
                type: 'offer'
            })
        };
    });

    describe('on init', () => {
        it('should call for check changes if value is changed', fakeAsync(() => {
            sut.ngOnInit();
            expect(ChangeDetectorRef.markForCheck).not.toHaveBeenCalled();
            tick(1);
            expect(ChangeDetectorRef.markForCheck).toHaveBeenCalled();
        }));
    });

    describe('get id', () => {
        it('should get id', () => {
            const result = sut.getId();
            expect(result).toEqual(id);
        });
    });

    describe('get incentive id', () => {
        it('should get incentive id', () => {
            const result = sut.getIncentiveId();
            expect(result).toEqual(offer.incentiveId);
        });
    });
});
