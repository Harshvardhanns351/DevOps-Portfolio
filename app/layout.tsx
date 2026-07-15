import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sakshi | Cloud & DevOps Engineer — Infrastructure Architect",
  description: "Interactive portfolio of Harshvardhan, a specialist DevOps Engineer designing deployment automation, Kubernetes orchestration, Jenkins pipelines, and multi-cloud solutions.",
  keywords: [
    "DevOps",
    "Cloud Engineer",
    "Kubernetes",
    "Docker",
    "Terraform",
    "CI/CD",
    "ArgoCD",
    "AWS Architect"
  ],
  authors: [{ name: "Harshvardhan NS" }],
  openGraph: {
    title: "Harshvardhan | Cloud & DevOps Engineer",
    description: "Interactive DevOps command center portfolio showcasing Kubernetes orchestration, Terraform networks automation, and GitOps systems.",
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
