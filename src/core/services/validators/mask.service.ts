import { Injectable } from '@angular/core';
import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';
import { onlyDecimalNumber, onlyNumber } from './mask.constant';

export class Mask {
    mask: (rawValue: string) => any[] | RegExp[];
    placeholderChar: string;
}

@Injectable()
export class MaskService {
    constructor() {
    }

    onlyNumberMask(): RegExp[] {
        return createNumberMask(onlyNumber);
    }

    onlyDecimalNumberMask(): RegExp[] {
        return createNumberMask(onlyDecimalNumber);
    }

    zeroOrOneWithDecimal(): Mask {
        return {
            mask: (rawValue: string): any[] => {
                return rawValue[0] >= '1'
                    ? [/[1]/]
                    : [/[0-1]/, /[\\.]/, /\d/, /\d/];
            },
            placeholderChar: '\u2000',
        };
    }
}
