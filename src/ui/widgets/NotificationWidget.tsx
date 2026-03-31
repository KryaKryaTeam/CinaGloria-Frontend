import { INotification } from "@/core/domain/entity/Notification";
import { NotificationStatus } from "@/core/domain/entity/NotificationType.enum";

export default function NotificationWidget({
  status,
  title,
  content,
  from,
}: INotification) {
  const isRead = status === NotificationStatus.readed;

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50">
      {/* Status indicator */}
      <div
        className={`size-2 shrink-0 rounded-full ${
          isRead ? "bg-emerald-400" : "bg-blue-500"
        }`}
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">From: {from}</p>
        <p className="truncate text-xs text-muted-foreground">Content: {content}</p>
      </div>

      {/* Status badge */}
      <span
        className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${
          isRead
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
            : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
        }`}
      >
        {isRead ? "Read" : "New"}
      </span>
    </div>
  );
}
