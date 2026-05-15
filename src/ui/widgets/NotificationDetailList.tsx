// import { INotification } from "@/core/domain/entity/Notification";
// import { Mail, Users } from "lucide-react";

// export default function NotificationDetailList({ notification }: { notification: INotification }) {
//     return (
//               <div className="px-6 py-5 border-b border-zinc-100 space-y-3">
//         <div className="flex items-center gap-3">
//           <div className="w-24 shrink-0">
//             <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">From</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center">
//               <span className="text-xs font-semibold text-violet-700">
//                 {notification.from.charAt(0).toUpperCase()}
//               </span>
//             </div>
//             <span className="text-sm text-zinc-700">{notification.from}</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-24 shrink-0">
//             <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">To</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Mail size={14} className="text-zinc-400" />
//             <span className="text-sm text-zinc-700">{notification.to}</span>
//           </div>
//         </div>
//         <div className="flex items-start gap-3">
//           <div className="w-24 shrink-0 pt-0.5">
//             <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Targets</span>
//           </div>
//           <div className="flex flex-wrap gap-1.5">
//             {notification.targets.map((target) => (
//               <span
//                 key={target}
//                 className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-md text-xs font-medium"
//               >
//                 <Users size={10} />
//                 {target}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
// }
