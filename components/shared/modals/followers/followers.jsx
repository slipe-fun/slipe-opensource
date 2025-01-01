import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import SearchBar from "../search-modal/search-bar";
import { useState } from "react";
import User from "./user";

//TODO: add user block and search(needs search page)

export default function FollowersModal({ children, user, open, setOpen }) {
	const [searchValue, setSearchValue] = useState();
	const [focus, setFocus] = useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader
					data-shadowed={focus}
					className='p-5 duration-200 ease-out data-[shadowed=true]:opacity-30 data-[shadowed=true]:pointer-events-none'
				>
					<DrawerTitle className='font-medium'>{user.username}'s followers</DrawerTitle>
				</DrawerHeader>
				<ul data-shadowed={focus} className="w-full duration-200 !h-[31.5rem] overflow-y-auto ease-out data-[shadowed=true]:opacity-40 px-5 relative pb-[5.5rem] flex flex-col gap-5">
					<User user={user}/>
				</ul>
				<DrawerFooter id='categories-scroller' className='p-5 w-full flex-row fixed items-end bottom-0 bg-modal z-10 flex gap-4'>
					<SearchBar setFocus={setFocus} value={searchValue} setValue={setSearchValue} className="bg-foreground/[0.08]" placeholder="Search for followers"/>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
