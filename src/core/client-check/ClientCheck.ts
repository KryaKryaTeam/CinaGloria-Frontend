export default abstract class ClientCheck<TData> {
    abstract condition: (data: TData) => boolean;
    onSuccess?: (data: TData) => void;
    abstract onFailure?: (data: TData) => void;

    constructor(protected readonly data: TData) {}

    check(): void {
        const result = this.condition(this.data);
        if (result) {
            this.onSuccess?.(this.data);
        } else {
            this.onFailure?.(this.data);
        }
    }
}