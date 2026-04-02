import { Event } from "./Event";

type Handler<T = unknown> = (event: Event<T>) => void;

export class EventDispatcher {
  private _events: Event<unknown>[] = [];
  private _handlers: Map<string, Handler[]> = new Map();

  public addEvent(event: Event<unknown>): void {
    this._events.push(event);
  }

  
  public register<T>(eventType: string, handler: Handler<T>): void {
    if (!this._handlers.has(eventType)) {
      this._handlers.set(eventType, []);
    }
    this._handlers.get(eventType)!.push(handler as Handler);
  }

  public dispatchEvents(): void {
    this._events.forEach((event) => {
      const handlers = this._handlers.get(event.EventType) ?? [];
      handlers.forEach((handler) => handler(event));
    });

    this._events = []; 
  }
}