import { Event } from "../event/Event";

export abstract class Root {
  private _domainEvents: Event<unknown>[] = [];

  protected raise(event: Event<unknown>): void {
    this._domainEvents.push(event);
  }

  public pullEvents(): Event<unknown>[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }
}