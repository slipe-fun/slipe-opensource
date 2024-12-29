import { useState } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { AdjustHeight } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Counter from "../../counter";

export default function DescriptionModal({ children, open, setOpen, user }) {
	const [description, setDescription] = useState("");
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader className='p-5 duration-200 ease-out data-[shadowed=true]:opacity-30 data-[shadowed=true]:pointer-events-none'>
					<DrawerTitle className='font-medium'>Edit about me</DrawerTitle>
				</DrawerHeader>
				<div className='w-full h-[32.5rem] flex flex-col px-5 gap-3'>
					<Textarea
						maxLength={165}
						value={description}
						onChange={e => {
							setDescription(e.target.value);
                            AdjustHeight(e.target, '192px');
						}}
						className='bg-foreground/[0.08] h-48 resize-none text-lg rounded-[1.25rem] p-4'
						placeholder='Description here'
					/>
                    <Counter value={description.length} maxValue={165}/>
				</div>
				<DrawerFooter className='p-5 fixed flex flex-row gap-5 w-full z-10 bg-modal bottom-0'>
					<Button onClick={() => setOpen(false)} variant='secondary' className='rounded-full' size='full'>
						Cancel
					</Button>
					<Button onClick={() => setOpen(false)} className='rounded-full font-semibold' size='full'>
						Save
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
