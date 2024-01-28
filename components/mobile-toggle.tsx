import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import NavigationSidebar from "./navigation/navigation-sidebar";
import ServerSidebar from "./server/server-sidebar";

interface ModdleToggleProps {
    serverId: string;
}

const ModdleToggle = (
    {serverId}: ModdleToggleProps
) => {
    return ( 
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 flex gap-0">
                    <div className="w-[72px]">
                        <NavigationSidebar />
                    </div>
                        <ServerSidebar 
                            serverId={serverId}
                        />
                </SheetContent>
            </Sheet>
        </div>
     );
}
 
export default ModdleToggle;