export class List<T> {
    constructor(private items: Array<T> = []) {

    }

    public size(): number {
        return this.items.length;
    }

    public add(value: T): void {
        this.items.push(value);
    }

    public get(index: number): T {
        return this.items[index];
    }

    public first(): T {
        return this.items[0];
    }

    public last(): T {
        return this.items[this.size() - 1];
    }

    public all(): Array<T> {
        return this.items;
    }

    public toArray(): Array<T> {
        return this.all();
    }
}