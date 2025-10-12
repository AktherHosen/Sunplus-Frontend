"use client";

import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { CompanyHeader } from "./company-header";

// This is sample data.
const data = {
  user: {
    name: "sunplus",
    email: "sunplusbd@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Profile",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Profile",
          url: "#",
        },
        {
          title: "Users",
          url: "#",
        },
      ],
    },
    {
      title: "Product",
      url: "/dashboard/products",
      icon: Bot,
      items: [{ title: "Products", url: "/dashboard/products" }],
    },
    {
      title: "Category",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Category",
          url: "/dashboard/categories",
        },
        {
          title: "Subcategory",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Orders",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
