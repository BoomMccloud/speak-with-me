"use client";

import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "/", <HomeOutlined />),
  getItem("Chat", "/chat", <WechatWorkOutlined />),
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Update layout margin when sidebar collapses
  useEffect(() => {
    const mainLayout = document.querySelector('.ant-layout:not(:first-child)');
    if (mainLayout) {
      (mainLayout as HTMLElement).style.marginLeft = collapsed ? '70px' : '200px';
    }
  }, [collapsed]);

  const handleSignIn = () => {
    router.push("/auth/login");
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      window.location.href = "/";
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      zeroWidthTriggerStyle={{ background: "red" }}
      collapsedWidth={70}
      className="fixed left-0 top-0 bottom-0 h-screen overflow-auto shadow-lg"
      style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="flex flex-col justify-between h-full p-2">
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          mode="inline"
          items={items}
          onClick={({ key }: { key: string }) => {
            router.push(key);
          }}
        />
        <Button
          className="mb-2"
          icon={session ? <LogoutOutlined /> : <LoginOutlined />}
          onClick={session ? handleSignOut : handleSignIn}
          loading={status === "loading"}
          type="primary"
          block
          variant="outlined"
          color="primary"
        >
          {!collapsed && (session ? "Sign out" : "Sign in")}
        </Button>
      </div>
    </Sider>
  );
};