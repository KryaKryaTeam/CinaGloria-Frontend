import type { NextConfig } from "next";
import { Header } from "next/dist/lib/load-custom-routes";

const cspHeader = `
    default-src 'self';
    script-src 'self' 
               https://accounts.google.com/gsi/client 
               ${process.env.NODE_ENV == "development" ? "'unsafe-eval' 'unsafe-inline'" : ""}; 
    style-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/style;
    frame-src https://accounts.google.com/gsi/;
    connect-src 'self' https://accounts.google.com/gsi/ https://bots.swedka121.com/app/ wss://bots.swedka121.com/ws/;
    img-src 'self' data: https://*.googleusercontent.com https://cinagloria-service-bucket.s3.us-east-1.amazonaws.com/ https://bots.swedka121.com/app/;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const headers: () => Header[] = () => {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy-Report-Only", value: cspHeader },
      ],
    },
  ];
};

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  headers,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cinagloria-service-bucket.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
