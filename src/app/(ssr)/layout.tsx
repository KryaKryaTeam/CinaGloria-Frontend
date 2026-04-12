import BaseHeader from "@/ui/widgets/base/BaseHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BaseHeader />
      <main>{children}</main>
    </div>
  );
}