import { INotification } from "@/core/domain/entity/Notification";
import { format } from "date-fns/format";
import { Bell, Clock } from "lucide-react";
import { marked } from "marked";

export default function NotificationDetailPanel({ notification }: { notification: INotification | null }) {

  const parsedContent = notification
    ? marked(notification.content)
    : null;

  if (!notification) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-50 text-zinc-400">
        <Bell size={40} className="mb-3 opacity-30" />
        <p className="text-sm">Select a notification to view details</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-auto">
      <div className="px-6 py-5 border-b border-zinc-100">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="text-lg font-semibold text-zinc-900 leading-snug">{notification.title}</h2>
        </div>
        <p className="text-xs text-zinc-400 flex items-center gap-1.5">
          <Clock size={11} />
          {format(notification.createdAt, "MM/dd/yyyy h:mm a")}
        </p>
      </div>

      <div className="px-6 py-5">

        <div
          className="text-sm text-zinc-600 leading-relaxed prose prose-sm"
          dangerouslySetInnerHTML={{ __html: parsedContent as string }}
        />
      </div>
    </div>
  );
}

