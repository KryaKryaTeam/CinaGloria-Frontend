import ReadedRequest from "@/core/requests/network/ReadedRequest.request";
import { EventDispatcher } from "./Dispatcher";
import { Event } from "./Event";
import { EventType } from "./EventType";
import ReadedEvent from "./Readed.event";
import { NetworkRequest } from "@/core/requests/network/NetworkRequest";
export class ReadedDispatcher extends EventDispatcher {
  constructor(private request: ReadedRequest) {
    super();
    this.register<{ id: string }>(EventType.ReadedNotification, this.handle);
  }

  private handle = async (event: Event<unknown>): Promise<void> => {
    const { id } = (event as ReadedEvent).payload;

    await this.request.execute(id)

  };
}