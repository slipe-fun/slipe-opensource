import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import SearchBar from "../search-modal/search-bar";
import { useState } from "react";
import User from "./user";
import NoContent from "../../no-content";

// Если что data-shadowed у DrawerFooter это если у чела нету подписок, это делает поиск неактивным

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
				<ul
					data-shadowed={focus}
					className='w-full duration-200 !h-[32.5rem] overflow-y-auto ease-out data-[shadowed=true]:opacity-40 px-5 relative pb-24 flex flex-col gap-5'
				>
					{/* <User user={user}/> */}
					<NoContent
						className='h-full p-0 animate-[fadeIn_0.3s_ease-out]'
						title="You don't have subscribers yet"
						primary='Perhaps the first subscribers will be here soon'
						image='nothing.png'
					/>
				</ul>
				<DrawerFooter
					data-shadowed={false}
					id='categories-scroller'
					className='p-5 w-full data-[shadowed=true]:opacity-30 flex-row fixed items-end bottom-0 bg-modal z-10 flex gap-4'
				>
					<SearchBar
						setFocus={setFocus}
						value={searchValue}
						setValue={setSearchValue}
						className='bg-foreground/[0.08]'
						placeholder='Search for followers'
					/>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
