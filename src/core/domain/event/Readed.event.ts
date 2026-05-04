import { Event } from "./Event";
import { EventType } from "./EventType";
interface EventPayload {
  id: string;
}
export default class ReadedEvent extends Event<EventPayload> {
  public EventType: EventType = EventType.ReadedNotification;
  constructor(_payload: EventPayload) {
    super(_payload);
  }
}
