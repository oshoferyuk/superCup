import { URLSearchParams } from '@angular/http';
import { SubmitFormOfferService } from './submit-form-offer.service';
import { Observable } from 'rxjs/Observable';
import { DialogOptions } from '../../../core/dialog/dialog-options.model';

describe('SubmitFormOfferService', () => {
    let sut;
    let HttpService;
    let DialogService;
    let ViewContainerRef;
    let TranslateService;

    const type = Symbol('type');
    const id = Symbol('id');
    const urlSearchParams = new URLSearchParams();
    let offer;

    beforeEach(() => {
        HttpService = {
            post: jasmine.createSpy('post'),
            put: jasmine.createSpy('put').and.returnValue(Observable.of()),
        };

        DialogService = {
            alert: jasmine.createSpy('alert'),
            confirm: jasmine.createSpy('confirm').and.returnValue(Observable.of()),
        };

        ViewContainerRef = {};

        TranslateService = {
            instant: jasmine.createSpy('instant').and.returnValue('test')
        }

        sut = new SubmitFormOfferService(
            HttpService,
            DialogService,
            ViewContainerRef,
            TranslateService
        );
    });

    describe('submit offer', () => {
        describe('when offer does not have id', () => {
            beforeEach(() => {
                offer = {type};
            });

            it('should make post request for creation', () => {
                sut.submitOffer(offer);
                expect(HttpService.post).toHaveBeenCalledWith(`/${type}s/`, offer);
            });
        });

        describe('when offer has id', () => {
            beforeEach(() => {
                offer = {type, id};
                sut.submitOffer(offer);
                urlSearchParams.set('stateTransitionType', 'SAVE_DRAFT');
            });

            it('should make put request for creation', () => {

                expect(HttpService.put).toHaveBeenCalledWith(
                    `/${type}s/${id}`,
                    offer,
                    urlSearchParams
                );
            });
        });
    });

    describe('publish offer', () => {
        beforeEach(() => {
            offer = {type, id};
            urlSearchParams.set('stateTransitionType', 'PUBLISH');
        });

        it('should make put request for publish offer', () => {
            sut.publishOffer(offer);
            expect(HttpService.put).toHaveBeenCalledWith(
                `/${type}s/${id}`,
                offer,
                urlSearchParams
            );
        });

        describe('when known error', () => {
            beforeEach(() => {
                HttpService.put.and.returnValue(Observable.throw({}));
                sut.publishOffer(offer).subscribe();
            });

            it('should show alert', () => {
                const dialogOptions = new DialogOptions();
                dialogOptions.options = {
                    title: 'test',
                    message: 'test'
                };
                expect(DialogService.alert).toHaveBeenCalledWith(
                    ViewContainerRef,
                    dialogOptions
                );
            });
        });
    });

    describe('disable offer', () => {
        beforeEach(() => {
            offer = {type, id};
            sut.disableOffer(offer);
            urlSearchParams.set('stateTransitionType', 'DISABLE');
        });

        it('should make put request for disable offer', () => {
            expect(HttpService.put).toHaveBeenCalledWith(
                `/${type}s/${id}`,
                offer,
                urlSearchParams
            );
        });
    });

    describe('delete offer', () => {
        beforeEach(() => {
            offer = {type, id};
            sut.deleteOffer(offer);
            urlSearchParams.set('stateTransitionType', 'DELETE');
        });

        it('should make put request for delete offer', () => {
            expect(HttpService.put).toHaveBeenCalledWith(
                `/${type}s/${id}`,
                offer,
                urlSearchParams
            );
        });
    });

    describe('show delete dialog', () => {
        let result;
        let succesCb;

        beforeEach(() => {
            succesCb = jasmine.createSpy('succesCb')
        });

        it('should show dialog', () => {
            sut.showDeleteDialog();

            expect(DialogService.confirm).toHaveBeenCalledWith(
                ViewContainerRef,
                jasmine.objectContaining({
                    options: {
                        message: 'offer.dialogs.deleteOffer.message',
                        ok: 'buttons.confirm'
                    }
                })
            );
        });

        describe('when dialog rejected', () => {
            beforeEach(() => {
                DialogService.confirm.and.returnValue(Observable.of(false));

                result = sut.showDeleteDialog().subscribe(succesCb);
            });

            it('should not return dialog result further', () => {
                expect(succesCb).not.toHaveBeenCalled();
            });
        });

        describe('when dialog resolved', () => {
            beforeEach(() => {
                DialogService.confirm.and.returnValue(Observable.of(true));

                result = sut.showDeleteDialog().subscribe(succesCb);
            });

            it('should return dialog result further', () => {
                expect(succesCb).toHaveBeenCalled();
            });
        });
    });
});
