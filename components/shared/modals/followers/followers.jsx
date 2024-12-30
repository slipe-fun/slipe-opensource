import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

//TODO: add user block and search(needs search page)

export default function FollowersModal({ children, user, open, setOpen }) {
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader
					data-shadowed={inputFocus}
					className='p-5 duration-200 ease-out data-[shadowed=true]:opacity-30 data-[shadowed=true]:pointer-events-none'
				>
					<DrawerTitle className='font-medium'>{user.username}'s followers</DrawerTitle>
				</DrawerHeader>
				<DrawerFooter id='categories-scroller' className='p-5 w-full flex-row fixed items-end bottom-0 bg-modal z-10 flex gap-5'>
					
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
