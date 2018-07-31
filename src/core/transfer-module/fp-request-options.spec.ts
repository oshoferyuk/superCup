import { FpRequestOptions } from './fp-request-options';
import { environment } from '../../../environments/environment';

describe('FpRequestOptions', () => {
    let sut;
    let backendUrl;

    beforeEach(() => {
        backendUrl = environment.backendUrl;

        sut = new FpRequestOptions();
    });

    it('should use application/json as default content type', () => {
        expect(sut.headers.get('Content-Type')).toEqual('application/json');
    });

    describe('merge', () => {
        let result;

        it('should prefix url', () => {
            result = sut.merge({ url: '/url' });
            expect(result.url).toEqual(`${backendUrl}/oms-ui/url`);
        });

        it('should not prefix url again when it already contains prefix', () => {
            const url = `${backendUrl}/url`;
            result = sut.merge({ url });
            expect(result.url).toEqual(url);
        });

        it('should not prefix empty url', () => {
            result = sut.merge({url: null});
            expect(result.url).toEqual(null);
        });
    });

});
