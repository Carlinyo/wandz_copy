// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
}

// eslint-disable-next-line import/prefer-default-export
export class Stack<T> implements IStack<T> {
  private storage: T[] = [];

  // eslint-disable-next-line no-useless-constructor
  constructor(private capacity: number = Infinity) {}

  push(item: T): void {
    if (this.size() === this.capacity) {
      throw Error('Stack has reached max capacity, you cannot add more items');
    }
    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  size(): number {
    return this.storage.length;
  }
}
