import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarFooter, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton
} from "@/components/ui/sidebar";

import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"


import {
    Home, DollarSign, University
} from "lucide-react"


var items = [
    {
        name: "Home",
        link: "#",
        icon: Home
    },
    {
        name: "buy",
        link: "#",
        icon: DollarSign
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div>
                    <span className="font-bold">
                        SASA SANARE</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.name} className="h-8">
                                        <SidebarMenuButton asChild>
                                            <a href="/">
                                                <item.icon/>
                                                <span className="font-size-25">{item.name}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    )
                                )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
               <SidebarMenu>
                   <SidebarMenuItem>
                       <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>

                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                           <DropdownMenuContent
                            side="top"
                            className="w-[--radix-popper-anchor-width]"
                           >
                               <DropdownMenuItem>
                                   <span>Account</span>
                               </DropdownMenuItem>
                               <DropdownMenuItem>
                                   <span>Billing</span>
                               </DropdownMenuItem>
                               <DropdownMenuItem>
                                   <span>Sign out</span>
                               </DropdownMenuItem>
                           </DropdownMenuContent>
                       </DropdownMenu>
                   </SidebarMenuItem>
               </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}