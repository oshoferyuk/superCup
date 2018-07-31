import { DistributionDetailsComponent } from './distribution-details.component';

describe('DistributionDetailsComponent', () => {
    let sut;
    let form;

    const coupon = Symbol('coupon');
    const sample = Symbol('sample');
    const type = Symbol('type');

    beforeEach(() => {
        form = {
            value: {
                type
            },
            get: jasmine.createSpy('get').and.callFake(type => {
                if (type === 'coupon') {
                    return coupon;
                } else if(type === 'sample') {
                    return sample;
                }
            }),
            getRawValue: jasmine.createSpy('getRawValue').and.returnValue({type})
        };

        sut = new DistributionDetailsComponent();
        sut.form = form;
    });

    describe('on init', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should get coupon form from parent form', () => {
            expect(sut.couponForm).toEqual(coupon);
        });

        it('should get sample form from parent form', () => {
            expect(sut.couponForm).toEqual(coupon);
        });
    });

    describe('get type', () => {
        it('should get type from parent form', () => {
            expect(sut.getType()).toEqual(type);
        });
    });
});
