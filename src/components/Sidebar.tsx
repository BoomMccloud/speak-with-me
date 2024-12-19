// src/components/Sidebar.tsx

"use client";

import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

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
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const siderStyle: React.CSSProperties = {
  // overflow: "auto",
  height: "100vh",
  position: "sticky",
  // insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    try {
      // Get the callback URL from the URL parameters if it exists
      const searchParams = new URLSearchParams(window.location.search);
      const callbackUrl = searchParams.get('callbackUrl') || window.location.href;
  
      void signIn('google', { 
        prompt: "select_account",
        callbackUrl: callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ 
        redirect: true,
        callbackUrl: '/'  // This will always redirect to home page
      });
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback redirect if the signOut fails
      window.location.href = '/';
    }
  };

  const renderAuthButton = () => {
    if (status === "loading") {
      return <Button className="mb-2 w-full" loading>Loading...</Button>;
    }

    if (session) {
      return (
        <Button
          className="mb-2 w-full"
          icon={<LogoutOutlined />}
          onClick={handleSignOut}
        >
          {!collapsed && "Sign out"}
        </Button>
      );
    }

    return (
      <Button
        className="mb-2 w-full"
        icon={<LoginOutlined />}
        onClick={handleSignIn}
      >
        {!collapsed && "Sign in"}
      </Button>
    );
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="flex flex-col justify-between p-2 h-full">
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
        {renderAuthButton()}
      </div>
    </Sider>
  );
};
