import ReadedRequest from "@/core/requests/network/ReadedRequest.request";
import { ReadedDispatcher } from "../event/ReadedDispatcher";
import { Notification } from "../entity/Notification";
import { injectable } from "inversify";
@injectable()
export class NotificationAggregate {
  private dispatcher: ReadedDispatcher;

  constructor(private request: ReadedRequest) {
    this.dispatcher = new ReadedDispatcher(request);
  }

  async markAsRead(notification: Notification, actorId: string): Promise<void> {
    notification.markAsRead(actorId);

    const events = notification.pullEvents();
    events.forEach((e) => this.dispatcher.addEvent(e));

    await this.dispatcher.dispatchEvents();
  }
}
