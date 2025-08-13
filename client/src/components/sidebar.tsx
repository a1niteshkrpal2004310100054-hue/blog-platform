import * as React from "react";
import { Home, Library, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  // SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  //   SidebarMenuSub,
  //   SidebarMenuSubButton,
  //   SidebarMenuSubItem,
} from "@/components/ui/sidebar";
// import { url } from "inspector";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icons: Home,
      //   items: [
      //     {
      //       title: "Installation",
      //       url: "#",
      //     },
      //     {
      //       title: "Project Structure",
      //       url: "#",
      //     },
      //   ],
    },
    {
      title: "Library",
      url: "#",
      icons: Library,
    },
    {
      title: "Profile",
      url: "/profile",
      icons: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="max-h-screen mt-16 md-mt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className="font-semibold text-xl opacity-80"
                  >
                    {item.icons && <item.icons />}
                    {item.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
