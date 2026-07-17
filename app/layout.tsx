import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HVS | Cloud & DevOps Engineer",
  description: "Portfolio of Harshvardhan NS — Cloud & DevOps Engineer specializing in Kubernetes orchestration, Terraform automation, GitOps pipelines, and multi-cloud infrastructure.",
  keywords: [
    "DevOps",
    "Cloud Engineer",
    "Kubernetes",
    "Docker",
    "Terraform",
    "CI/CD",
    "ArgoCD",
    "AWS Architect",
    "HVS"
  ],
  authors: [{ name: "Harshvardhan NS" }],
  openGraph: {
    title: "HVS | Cloud & DevOps Engineer",
    description: "Portfolio showcasing Kubernetes orchestration, Terraform automation, and GitOps systems by Harshvardhan NS.",
    type: "website",
    url: "https://harsh.engineer"
  }
};

export const viewport: Viewport = {
  themeColor: "#020202",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#020202] text-[#F3F4F6]">
        {children}
      </body>
    </html>
  );
}
