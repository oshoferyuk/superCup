export function autoUnsubscribe(subName: string = 'sub', isArray: boolean = true): any {
    return function (constructor: any): void {
        const original = constructor.prototype.ngOnDestroy;
        constructor.prototype.ngOnDestroy = function (): void {
            const sub = this[subName];
            if (sub && isArray) {
                sub.forEach(s => s.unsubscribe());
            } else if (sub && !isArray) {
                sub.unsubscribe();
            }
            if (original && typeof original === 'function') {
                original.apply(this, arguments);
            }
        };
    };
}
