import { DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, NestedDrawer, Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/utils";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";

export default function PostDeletingModal({ children, open, setOpen, deleteBlog, post, nested = true, content = "post" }) {
	const { token, storage } = useStorage();

	const contentTexts = {
		post: "Are you sure you want to delete the post?",
		comment: "Are you sure you want to delete the comment?",
	};

	async function deletePost() {
		const form_data = new FormData();
		form_data.append("post_id", post?.id);

		const request = await fetcher(api.v1 + "/post/delete", "post", form_data, {
			Authorization: "Bearer " + token,
		});

		if (request?.success) {
			deleteBlog(post?.id);
			//success toast
			//request?.success
		} else {
			//error toast
			//request?.error
		}

		setOpen(false);
	}

	const DrawerComponent = nested ? NestedDrawer : Drawer;

	return (
		<DrawerComponent open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader className='p-5'>
					<DrawerTitle className='font-medium'>Post deleting</DrawerTitle>
				</DrawerHeader>
				<div className='w-full h-[32.5rem] px-5 flex pb-24 flex-col gap-5 items-center justify-center'>
					<img loading='lazy' src='./static/states-assets/delete.png' className='w-40 h-40' />
					<div className='flex flex-col gap-1'>
						<span className='text-2xl text-center text-foreground font-medium'>{contentTexts[content]}</span>
						<span className='text-lg text-center text-foreground/50'>This action cannot be undone</span>
					</div>
				</div>
				<DrawerFooter className='p-5 fixed flex flex-row gap-5 w-full z-10 bg-modal bottom-0'>
					<Button variant='secondary' className='rounded-full' size='full'>
						Cancel
					</Button>
					<Button variant='deleting' className='rounded-full font-semibold' size='full' onClick={deletePost}>
						Delete
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</DrawerComponent>
	);
}
