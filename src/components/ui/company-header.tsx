import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import logo from "@/assets/logo.svg"
export function CompanyHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="grid flex-1 text-left text-sm leading-tight">
            <div className="flex-1 flex justify-start items-center h-12">
              <Link to="/" aria-label="Go to homepage">
                <Avatar className="h-42 w-42">
                  <AvatarImage
                    src={logo}
                    alt="SunPluS Logo"
                    className="object-contain"
                  />
                  <AvatarFallback className="bg-primary text-white flex items-center justify-center">
                    SP
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
