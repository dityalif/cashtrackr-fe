import {
  ChartBarStacked,
  Coins,
  BanknoteArrowDown,
  CircleUserRound,
  LayoutDashboard,
  Search,
  Settings,
  ChevronsUpDown,
  ChevronUp,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: BanknoteArrowDown,
  },
  {
    title: "Categories",
    url: "#",
    icon: ChartBarStacked,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar({ className }) {
  return (
    <Sidebar variant="floating" collapsible="" className={className}>
      <SidebarContent>
        <SidebarHeader className="text-3xl font-bold text-left text-primary py-4 flex flex-row items-center">
          <Coins />
          CashTrackr
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-gray-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <CircleUserRound />
              Account Settings
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem asChild>
              <a href="/login">
                <span>Log In</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/register">
                <span>Register</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
