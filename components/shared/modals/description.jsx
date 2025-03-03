import { useEffect, useState } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { AdjustHeight } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Counter from "../counter";
import {fetcher} from "@/lib/utils";
import cdn from "@/constants/cdn";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";
import { toast } from "sonner";

export default function DescriptionModal({ children, open, setOpen, user, changeUserDescription }) {
	const { token, store } = useStorage();
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => setDescription(user?.description || ""), [user])

	async function changeDescription() {
		setIsLoading(true);
		const avatar = await fetch(cdn + "/avatars/" + user?.avatar).then(async res => await res.blob()).catch(() => null)
		const banner = await fetch(cdn + "/banners/" + user?.banner).then(async res => await res.blob()).catch(() => null)

		const formData = new FormData();
		if (avatar)
			formData.append('avatar', new File([avatar], "avatar.png", {
				type: avatar?.type
			}));
		if (banner)
			formData.append('banner', new File([banner], "banner.png", {
				type: banner?.type
			}));
		formData.append('username', user?.username);
		if (user?.nickname) formData.append('nickname', user?.nickname || "");
		formData.append('description', description);

		const request = await fetcher(api.v1 + `/settings/profile`, "post", formData, { "Authorization": "Bearer " + token });

		if (request?.message) {
			changeUserDescription(description);
			setOpen(false);
			toast.success("Description saved!", { className: "bg-green text-green-foreground" });
		} else {
			toast.error(request?.error, { className: "bg-red text-red-foreground z-50" });
		}
		setIsLoading(false);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader className='p-4 duration-200 ease-out data-[shadowed=true]:opacity-30 data-[shadowed=true]:pointer-events-none'>
					<DrawerTitle className='font-medium'>Edit about me</DrawerTitle>
				</DrawerHeader>
				<div className='w-full h-[32.5rem] flex flex-col px-4 gap-3'>
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
					<Counter value={description.length} maxValue={165} />
				</div>
				<DrawerFooter className='p-4 fixed pb-[calc(1rem+var(--safe-area-inset-bottom))] flex flex-row gap-4 w-full z-10 bg-modal bottom-0'>
					<Button onClick={() => setOpen(false)} variant='secondary' className='rounded-full' size='full'>
						Cancel
					</Button>
					<Button disabled={isLoading} onClick={changeDescription} className='rounded-full font-semibold' size='full'>
						Save
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
