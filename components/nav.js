'use client'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

import Sejong from "@/public/assets/Sejong.png"

import Image from "next/image"

import {
    Bell, Pencil, DollarSign, MenuIcon, BellDot, User, Send
} from "lucide-react";

import Link from "next/link"
import {Sheet, SheetTrigger, SheetContent, SheetDescription, SheetHeader, SheetFooter, SheetTitle} from "@/components/ui/sheet"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import LoginButton from "@/components/googleLogin";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";

var menuItem = [
    {
        Name: "공동구매",
        Icon: DollarSign,
        Src: "/gb"
    },
    {
        Name: "자유게시판",
        Icon: Pencil,
        Src: "/freeboard"
    },
    {
        Name: "공지사항",
        Icon: Bell,
        Src: "/notice"
    },
    {
        Name: "문의게시판",
        Icon: BellDot,
        Src: "/contact"
    }
];

export default function Nav() {
    const {data: session, status} = useSession();
    const pathname = usePathname();
    if (pathname.endsWith("login")) {
        return null;
    }
    if (!session) return null;
    return (
        <div className="bg-white">
            <header className="flex h-20 items-center px-4 md:px-6">
                <NavigationMenu viewport={false} className="p-3 hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/">
                                <figure>
                                    <Image
                                        src={Sejong}
                                        alt="세종과학예술영재학교"
                                        width={150}
                                    />
                                </figure>
                            </Link>
                        </NavigationMenuItem>
                        {menuItem.map((item)=>
                            <NavigationMenuItem key={item.Name}>
                                <Link href={item.Src} className={navigationMenuTriggerStyle()}>
                                    <item.Icon size={17}/>
                                    <span>{item.Name}</span>
                                </Link>
                            </NavigationMenuItem>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="md:hidden outline bg-white hover:bg-gray-300">
                            <MenuIcon className="h-6 w-6" color="black"/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px]">
                        <SheetHeader>Menu</SheetHeader>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            {menuItem.map((item)=>
                                <Link href={item.Src} id={item.Src} className="flex h-9 px-2 gap-1 items-center hover:bg-gray-300 rounded-[5px]">
                                    <item.Icon className="w-[16px] h-[16px]" size={16}/>
                                    <span>{item.Name}</span>
                                </Link>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="ml-auto font-medium flex h-9 px-4 gap-2 items-center rounded-[5px] text-[15px]">
                    <Link href={`/message`} className="gap-1 flex items-center hover:bg-gray-100 rounded-[5px] px-2 h-9">
                        <span>메세지</span>
                        <Send className="w-[16px] h-[16px]"/>
                    </Link>
                    <Link href={`/user/${session.user.name}`} className="gap-1 flex items-center hover:bg-gray-100 rounded-[5px] px-2 h-9">
                        <span>{session.user.name}</span>
                        <User className="w-[16px] h-[16px]"/>
                    </Link>
                </div>
            </header>
            <hr/>
        </div>
    )
}