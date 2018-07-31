import { Observable } from 'rxjs/Rx';
import { HttpService } from './http.service';

describe('HttpService', () => {
    let sut;
    let Http;
    let RequestOptions;
    let ProgressSpinnerService;
    const urlMock = Symbol('url to request');
    const mockResponse = Symbol('some response');
    const mergedOptions = Symbol('merged options');

    beforeEach(() => {
        Http = jasmine.createSpyObj('Http', ['get', 'post', 'put', 'delete']);

        RequestOptions = {
            headers: {
                set: jasmine.createSpy('setHeader'),
                delete: jasmine.createSpy('deleteHeader'),
            },
            merge: jasmine.createSpy('merge').and.returnValue(mergedOptions)
        };

        ProgressSpinnerService = {
            show: jasmine.createSpy('show'),
            hide: jasmine.createSpy('hide')
        };

        sut = new HttpService(
            Http,
            RequestOptions,
            ProgressSpinnerService,
        );
    });

    describe('http methods', () => {
        beforeEach(() => {
            spyOn(HttpService, 'onResponseSuccess');
            Http.put.and.returnValue(Observable.of(mockResponse));
            Http.post.and.returnValue(Observable.of(mockResponse));
            Http.delete.and.returnValue(Observable.of(mockResponse));
        });

        describe('get method', () => {
            const search = Symbol('search');

            beforeEach(() => {
                Http.get.and.returnValue(Observable.of(mockResponse));
                sut.get(urlMock, search).subscribe(() => {});
            });

            it('should override url and search params', () => {
                expect(RequestOptions.merge).toHaveBeenCalledWith({
                    search,
                    url: urlMock
                });
            });

            it('should get data from server', () => {
                expect(Http.get).toHaveBeenCalledWith(urlMock, mergedOptions);
            });

            it('should get data from server response', () => {
                expect(HttpService.onResponseSuccess).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });

            it('should show spinner', () => {
                expect(ProgressSpinnerService.show).toHaveBeenCalled();
            });

            it('should hide spinner when request finished', () => {
                expect(ProgressSpinnerService.hide).toHaveBeenCalled();
            });
        });

        describe('post method', () => {
            const requestBody = Symbol('data to send');
            const search = Symbol('search');

            beforeEach(() => {
                Http.post.and.returnValue(Observable.of(mockResponse));
                sut.post(urlMock, requestBody, search).subscribe(() => {});
            });

            it('should override url', () => {
                expect(RequestOptions.merge).toHaveBeenCalledWith({
                    search,
                    url: urlMock
                });
            });

            it('should post data to server', () => {
                expect(Http.post).toHaveBeenCalledWith(urlMock, requestBody, mergedOptions);
            });

            it('should get data from server response', () => {
                expect(HttpService.onResponseSuccess).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });

            it('should show spinner', () => {
                expect(ProgressSpinnerService.show).toHaveBeenCalled();
            });

            it('should hide spinner when request finished', () => {
                expect(ProgressSpinnerService.hide).toHaveBeenCalled();
            });
        });

        describe('put method', () => {
            const requestBody = Symbol('data to send');
            const search = Symbol('search');

            beforeEach(() => {
                Http.put.and.returnValue(Observable.of(mockResponse));
                sut.put(urlMock, requestBody, search).subscribe(() => {});
            });

            it('should override url', () => {
                expect(RequestOptions.merge).toHaveBeenCalledWith({
                    search,
                    url: urlMock
                });
            });

            it('should post data to server', () => {
                expect(Http.put).toHaveBeenCalledWith(urlMock, requestBody, mergedOptions);
            });

            it('should get data from server response', () => {
                expect(HttpService.onResponseSuccess).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });

            it('should show spinner', () => {
                expect(ProgressSpinnerService.show).toHaveBeenCalled();
            });

            it('should hide spinner when request finished', () => {
                expect(ProgressSpinnerService.hide).toHaveBeenCalled();
            });
        });

        describe('delete method', () => {
            const search = Symbol('search');

            beforeEach(() => {
                Http.get.and.returnValue(Observable.of(mockResponse));
                sut.delete(urlMock, search).subscribe(() => {});
            });

            it('should override url', () => {
                expect(RequestOptions.merge).toHaveBeenCalledWith({
                    search,
                    url: urlMock
                });
            });

            it('should delete item', () => {
                expect(Http.delete).toHaveBeenCalledWith(urlMock, mergedOptions);
            });

            it('should get data from server response', () => {
                expect(HttpService.onResponseSuccess).toHaveBeenCalledWith(mockResponse, jasmine.any(Number));
            });

            it('should show spinner', () => {
                expect(ProgressSpinnerService.show).toHaveBeenCalled();
            });

            it('should hide spinner when request finished', () => {
                expect(ProgressSpinnerService.hide).toHaveBeenCalled();
            });
        });
    });

    describe('request headers', () => {
        const mockToken = Symbol('some mock token');
        const mockAuthHeader = mockToken;

        it('should be able to set auth headers', () => {
            sut.setAuthHeader(mockToken);

            expect(RequestOptions.headers.set).toHaveBeenCalledWith('Authorization', mockAuthHeader);
        });

        it('should be able to remove auth headers', () => {
            sut.removeAuthHeader();

            expect(RequestOptions.headers.delete).toHaveBeenCalledWith('Authorization');
        });
    });

    describe('response transformer', () => {
        let mockServerResponse;
        const convertedResponse = Symbol('converted server response');

        beforeEach(() => {
            mockServerResponse = {
                json: jasmine.createSpy('json').and.returnValue(convertedResponse)
            };
        });

        it('should extract data from response', () => {
            expect(HttpService.onResponseSuccess(mockServerResponse)).toEqual(convertedResponse);
        });
    });
});
