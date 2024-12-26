import { DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, NestedDrawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function PostDownloadModal({ children, open, setOpen, post }) {
	return (
		<NestedDrawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader className='p-4'>
					<DrawerTitle className='font-medium'>Post download</DrawerTitle>
				</DrawerHeader>
				<div className='w-full h-[32.5rem] px-4 flex pb-24 flex-col gap-4 items-center justify-center'>
					<div className='relative flex justify-center items-center'>
						{/* <svg id='progress' width='256' height='256' viewBox='0 0 100 100'>
							<circle cx='40' cy='40' r='40' pathLength='1' className='opacity-35 stroke-primary/35 [stroke-dashoffset:0] stroke-[15%] fill-none' />
							<motion.circle cx='4' cy='40' r='40' pathLength='1' className='stroke-primary stroke-[15%] [stroke-dashoffset:0] fill-none' strokeDashoffset={0} strokeDasharray={0.68} />
						</svg> */}
					</div>
					<span className='text-lg text-center text-foreground/50'>Downloading...</span>
				</div>
				<DrawerFooter className='p-4 fixed w-full z-10 bg-modal bottom-0'>
					<Button variant='secondary' size='full'>
						Cancel download
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</NestedDrawer>
	);
}
