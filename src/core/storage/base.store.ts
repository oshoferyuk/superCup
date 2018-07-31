import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class BaseStore<T> {
    private store: T;
    protected broadcast: BehaviorSubject<T>;

    constructor(store: T) {
        this.broadcast = new BehaviorSubject(store);
    }

    get(): T {
        return this.store;
    }

    update(store: T): T {
        this.store = store;
        this.broadcast.next(this.store);

        return this.store;
    }

    onUpdate(): Observable<T> {
        return this.broadcast.asObservable();
    }
}
