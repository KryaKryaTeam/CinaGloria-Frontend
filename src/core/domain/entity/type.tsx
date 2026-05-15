import {
  AlertTriangle,
  Ban,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  Code,
  Cpu,
  Eye,
  EyeOff,
  FileText,
  Gavel,
  Gift,
  Globe,
  HelpCircle,
  Hourglass,
  Info,
  Lightbulb,
  List,
  Lock,
  Medal,
  MessageCircleWarning,
  MessageCircleWarningIcon,
  MessageSquare,
  Share2,
  Star,
  Trophy,
  UnlockIcon,
  UserCheck,
  Users,
} from "lucide-react";
import { Unlock } from "next/font/google";

export type Providers = "LOCAL" | "GOOGLE" | "GITHUB";

export enum Icons {
  // Статуси та Важливе (для правил)
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  QUESTION = "QUESTION", // Для FAQ або умов
  EXCLAMATION = "EXCLAMATION", // Акцент на важливому правилі

  // Обмеження та Дозволи
  LOCK = "LOCK", // Закритий доступ
  UNLOCK = "UNLOCK", // Відкритий доступ
  PROHIBITED = "PROHIBITED", // "Заборонено" (коло з лінією)
  CHECK_CIRCLE = "CHECK_CIRCLE", // "Дозволено" або "Виконано"
  EYE = "EYE", // Видимість правил
  EYE_OFF = "EYE_OFF", // Прихований контент

  // Списки та Структура
  LIST = "LIST",
  GAVEL = "GAVEL", // "Молоток судді" — ідеально для розділу "Юридичні правила"
  FILE_TEXT = "FILE_TEXT", // Документація
  CLIPBOARD = "CLIPBOARD", // Вимоги до реєстрації
  BOOK = "BOOK", // Гайд або база знань

  // Час та Дедлайни
  CLOCK = "CLOCK", // Часові обмеження
  CALENDAR = "CALENDAR", // Дати етапів
  HOURGLASS = "HOURGLASS", // Процес очікування

  // Взаємодія та Користувачі
  USERS = "USERS", // Командні правила
  USER_CHECK = "USER_CHECK", // Вимоги до учасника
  MESSAGES = "MESSAGES", // Комунікація або чат
  SHARE = "SHARE", // Реферальні правила

  // Нагороди та Мотивація
  TROPHY = "TROPHY", // Призовий фонд
  STAR = "STAR", // Особливі умови / Вибране
  GIFT = "GIFT", // Бонуси
  MEDAL = "MEDAL", // Ранги учасників

  // Технічні / Гейміфікація
  CODE = "CODE", // Правила для розробників / API
  CPU = "CPU", // Технічні вимоги до заліза
  GLOBE = "GLOBE", // Регіональні обмеження
  LIGHTBULB = "LIGHTBULB", // Поради або підказки
}

export const IconsLucide: Record<Icons, React.ReactNode> = {
  ERROR: <MessageCircleWarning className="text-red-700" />,
  WARNING: <MessageCircleWarning className="text-yellow-400" />,
  INFO: <Info className="text-blue-500" />,
  SUCCESS: <CheckCircle2 className="text-green-500" />,
  QUESTION: <HelpCircle className="text-muted-foreground" />,
  EXCLAMATION: <AlertTriangle className="text-orange-500" />,
  LOCK: <Lock className="h-4 w-4" />,
  UNLOCK: <UnlockIcon className="h-4 w-4" />,
  PROHIBITED: <Ban className="text-red-500" />,
  CHECK_CIRCLE: <CheckCircle2 className="text-green-600" />,
  EYE: <Eye className="h-4 w-4" />,
  EYE_OFF: <EyeOff className="h-4 w-4" />,
  LIST: <List className="h-4 w-4" />,
  GAVEL: <Gavel className="text-stone-500" />,
  FILE_TEXT: <FileText className="h-4 w-4" />,
  CLIPBOARD: <ClipboardList className="h-4 w-4" />,
  BOOK: <BookOpen className="h-4 w-4" />,
  CLOCK: <Clock className="h-4 w-4" />,
  CALENDAR: <Calendar className="h-4 w-4" />,
  HOURGLASS: <Hourglass className="h-4 w-4" />,
  USERS: <Users className="h-4 w-4" />,
  USER_CHECK: <UserCheck className="text-blue-400" />,
  MESSAGES: <MessageSquare className="h-4 w-4" />,
  SHARE: <Share2 className="h-4 w-4" />,
  TROPHY: <Trophy className="text-yellow-500" />,
  STAR: <Star className="text-yellow-400" />,
  GIFT: <Gift className="text-pink-500" />,
  MEDAL: <Medal className="text-orange-400" />,
  CODE: <Code className="h-4 w-4" />,
  CPU: <Cpu className="h-4 w-4" />,
  GLOBE: <Globe className="h-4 w-4" />,
  LIGHTBULB: <Lightbulb className="text-yellow-300" />,
} as const;
