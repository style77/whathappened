import type Observer from "./observer";

export default interface Subject<T> {
    registerObserver(observer: Observer<T>): void;
    removeObserver(observer: Observer<T>): void;
    notifyObservers(data: T): void;
}