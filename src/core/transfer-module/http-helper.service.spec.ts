import { HttpHelperService } from './http-helper.service';

describe('HttpHelperService', () => {
    let sut;

    beforeEach(() => {
        sut = new HttpHelperService();
    });

    describe('transform to query', () => {
        let object;
        let key;
        let value;
        let result;

        beforeEach(() => {
            key = 'key';
            value = 'value';
            object = {};
            object[key] = value;
            result = sut.transformToQuery(object);
        });

        it('should return transformed type', () => {
            expect(result.get(key)).toEqual(value);
        });
    });

    describe('append multiple field', () => {
        const field = 'mockedField';
        const key = 'key';
        const value = 'value';
        const params = { [key]: value };
        let urlSearchParams;

        beforeEach(() => {
            urlSearchParams = {
                append: jasmine.createSpy('append')
            };
            sut.appendMultipleField(field, params, urlSearchParams);
        });

        it('should return append params', () => {
            expect(urlSearchParams.append).toHaveBeenCalledWith(field, `${key},${value}`);
        });
    });
});

