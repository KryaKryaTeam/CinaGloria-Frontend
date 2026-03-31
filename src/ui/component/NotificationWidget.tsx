import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  HelpCircle,
  AlertOctagon,
  Lock,
  Unlock,
  Ban,
  CheckCircle2,
  Eye,
  EyeOff,
  List,
  Gavel,
  FileText,
  Clipboard,
  Book,
  Clock,
  Calendar,
  Hourglass,
  Users,
  UserCheck,
  MessageSquare,
  Share2,
  Trophy,
  Star,
  Gift,
  Medal,
  Code,
  Cpu,
  Globe,
  Lightbulb,
  User,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import { INotification } from "@/core/domain/entity/Notification";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";
import { cn } from "@/infrastructure/utils";

interface NotificationWidgetProps {
  notification: INotification;
  className?: string;
}

const statusIconMap: Record<NotificationStatus, LucideIcon> = {
  [NotificationStatus.ERROR]: AlertCircle,
  [NotificationStatus.WARNING]: AlertTriangle,
  [NotificationStatus.INFO]: Info,
  [NotificationStatus.SUCCESS]: CheckCircle,
  [NotificationStatus.QUESTION]: HelpCircle,
  [NotificationStatus.EXCLAMATION]: AlertOctagon,
  [NotificationStatus.LOCK]: Lock,
  [NotificationStatus.UNLOCK]: Unlock,
  [NotificationStatus.PROHIBITED]: Ban,
  [NotificationStatus.CHECK_CIRCLE]: CheckCircle2,
  [NotificationStatus.EYE]: Eye,
  [NotificationStatus.EYE_OFF]: EyeOff,
  [NotificationStatus.LIST]: List,
  [NotificationStatus.GAVEL]: Gavel,
  [NotificationStatus.FILE_TEXT]: FileText,
  [NotificationStatus.CLIPBOARD]: Clipboard,
  [NotificationStatus.BOOK]: Book,
  [NotificationStatus.CLOCK]: Clock,
  [NotificationStatus.CALENDAR]: Calendar,
  [NotificationStatus.HOURGLASS]: Hourglass,
  [NotificationStatus.USERS]: Users,
  [NotificationStatus.USER_CHECK]: UserCheck,
  [NotificationStatus.MESSAGES]: MessageSquare,
  [NotificationStatus.SHARE]: Share2,
  [NotificationStatus.TROPHY]: Trophy,
  [NotificationStatus.STAR]: Star,
  [NotificationStatus.GIFT]: Gift,
  [NotificationStatus.MEDAL]: Medal,
  [NotificationStatus.CODE]: Code,
  [NotificationStatus.CPU]: Cpu,
  [NotificationStatus.GLOBE]: Globe,
  [NotificationStatus.LIGHTBULB]: Lightbulb,
};

const statusColorMap: Record<NotificationStatus, string> = {
  [NotificationStatus.ERROR]: "text-destructive",
  [NotificationStatus.WARNING]: "text-amber-500",
  [NotificationStatus.INFO]: "text-blue-500",
  [NotificationStatus.SUCCESS]: "text-emerald-500",
  [NotificationStatus.QUESTION]: "text-violet-500",
  [NotificationStatus.EXCLAMATION]: "text-orange-500",
  [NotificationStatus.LOCK]: "text-slate-500",
  [NotificationStatus.UNLOCK]: "text-emerald-500",
  [NotificationStatus.PROHIBITED]: "text-destructive",
  [NotificationStatus.CHECK_CIRCLE]: "text-emerald-500",
  [NotificationStatus.EYE]: "text-slate-500",
  [NotificationStatus.EYE_OFF]: "text-slate-400",
  [NotificationStatus.LIST]: "text-slate-500",
  [NotificationStatus.GAVEL]: "text-amber-600",
  [NotificationStatus.FILE_TEXT]: "text-blue-500",
  [NotificationStatus.CLIPBOARD]: "text-slate-500",
  [NotificationStatus.BOOK]: "text-indigo-500",
  [NotificationStatus.CLOCK]: "text-amber-500",
  [NotificationStatus.CALENDAR]: "text-blue-500",
  [NotificationStatus.HOURGLASS]: "text-amber-500",
  [NotificationStatus.USERS]: "text-blue-500",
  [NotificationStatus.USER_CHECK]: "text-emerald-500",
  [NotificationStatus.MESSAGES]: "text-blue-500",
  [NotificationStatus.SHARE]: "text-violet-500",
  [NotificationStatus.TROPHY]: "text-amber-500",
  [NotificationStatus.STAR]: "text-amber-400",
  [NotificationStatus.GIFT]: "text-pink-500",
  [NotificationStatus.MEDAL]: "text-amber-500",
  [NotificationStatus.CODE]: "text-slate-500",
  [NotificationStatus.CPU]: "text-slate-500",
  [NotificationStatus.GLOBE]: "text-blue-500",
  [NotificationStatus.LIGHTBULB]: "text-amber-400",
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function NotificationWidget({
  notification,
  className,
}: NotificationWidgetProps) {
  const StatusIcon = statusIconMap[notification.status];
  const statusColor = statusColorMap[notification.status];

  return (
    <Card className={cn("relative transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <StatusIcon className={cn("size-5", statusColor)} />
            <CardTitle className="text-base">{notification.title}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {notification.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Clock className="size-3" />
          {formatDate(notification.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-foreground">{notification.content}</p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="size-3" />
            <span>
              From: <span className="font-medium">{notification.from}</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <User className="size-3" />
            <span>
              To: <span className="font-medium">{notification.to}</span>
            </span>
          </div>
        </div>

        {notification.targets.length > 0 && (
          <div className="flex items-center gap-2">
            <Users className="size-3 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {notification.targets.map((target) => (
                <Badge key={target} variant="outline" className="text-xs">
                  {target}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
