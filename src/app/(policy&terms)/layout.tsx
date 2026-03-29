import Link from "next/link";
import { ReactNode } from "react";

export default function PolicyAndTermsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "60px auto",
        padding: "0 20px",
        fontFamily: "sans-serif",
        lineHeight: "1.7",
        color: "#333",
      }}
    >
      {}
      <main>{children}</main>

      {}
      <footer
        style={{
          marginTop: "50px",
          paddingTop: "20px",
          borderTop: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#0070f3",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          ← Back to Main Page
        </Link>
        <span style={{ color: "#999", fontSize: "14px" }}>
          © {new Date().getFullYear()} Your Project
        </span>
      </footer>
    </div>
  );
}
