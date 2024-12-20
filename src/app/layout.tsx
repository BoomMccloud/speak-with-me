"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Layout, ConfigProvider, theme } from "antd";
import { Sidebar } from "../components/Sidebar";
import Providers from "./Providers";

const { Content } = Layout;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#F8BBD0",
              },
              algorithm: [theme.darkAlgorithm],
              components: {
                Layout: {
                  bodyBg: "#0f0f10",
                  siderBg: "#0a0a0a",
                  triggerBg: "#0a0a0a",
                  triggerColor: "#F8BBD0",
                },
                Button: {
                  primaryColor: "#000000",
                  colorBgContainer: "transparent",
                },
                Menu: {
                  darkItemBg: "transparent",
                  darkSubMenuItemBg: "transparent",
                  darkItemSelectedColor: "#000000",
                },
              },
            }}
          >
            <Layout className="min-h-screen">
              <Sidebar />
              <Layout>
                <Content>{children}</Content>
              </Layout>
            </Layout>
          </ConfigProvider>
        </body>
      </Providers>
    </html>
  );
}
