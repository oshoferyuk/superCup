import { OfferInformationSampleComponent } from './offer-information-sample.component';
import { offerFields } from '../../form-coupon-constructor.constants';

describe('OfferInformationSampleComponent', () => {
    let sut;
    let MaskService;
    let form;
    let formControls;

    const number = Symbol('number');

    beforeEach(() => {
        MaskService = {
            onlyNumberMask: jasmine.createSpy('onlyNumberMask').and.returnValue(number)
        };

        sut = new OfferInformationSampleComponent(MaskService);
    });

    describe('on init', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should set only number mask on scope', () => {
            expect(sut.onlyNumberMask).toEqual(number);
        });
    });

    describe('image validation', () => {

        beforeEach(() => {

            const productImage = {
                markAsTouched: jasmine.createSpy('markAsTouched'),
                setErrors: jasmine.createSpy('setErrors')
            };
            formControls = {
                [offerFields.productImage]: productImage
            };
            form = {
                get: jasmine.createSpy('get').and.callFake(type => formControls['imageUrl']),
            };
            sut.form = form;

        });

        it('should invoke setErrors', () => {
            sut.productImageMaxSizeExceed();
            expect(sut.form.get('imageUrl').setErrors).toHaveBeenCalledWith({maxSize: true})
            expect(sut.form.get('imageUrl').markAsTouched).toHaveBeenCalled();
        });
    });
});
