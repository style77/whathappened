export default interface Observer<T> {
    update(data: T): void;
}