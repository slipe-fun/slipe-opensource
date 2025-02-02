import { DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, NestedDrawer, Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/utils";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";
import { toast } from "sonner";
import { useState } from "react";

export default function DeleteModal({ children, open, setOpen, deleteBlog, deleteComment, object, nested = true, content = "post" }) {
	const { token, store } = useStorage();
	const [isLoading, setIsLoading] = useState(false);

	async function deleteBlogRequest() {
		setIsLoading(true);
		const form_data = new FormData();
		form_data.append("post_id", object?.id);

		const request = await fetcher(api.v1 + "/post/delete", "post", form_data, {
			Authorization: "Bearer " + token,
		});

		if (request?.success) {
			deleteBlog(object?.id);
			toast.success("Post deleted!", { className: "bg-green text-green-foreground" });
		} else {
			toast.error(request?.error, { className: "bg-red text-red-foreground z-50" });
		}

		setIsLoading(false);
		setOpen(false);
	}

	async function deleteCommentRequest() {
		const form_data = new FormData();
		form_data.append("comment_id", object?.id);

		const request = await fetcher(api.v1 + "/comment/delete", "post", form_data, {
			Authorization: "Bearer " + token,
		});

		if (request?.success) {
			deleteComment(object?.id);
			toast.success("Comment deleted!", { className: "bg-green text-green-foreground" });
		} else {
			toast.error(request?.error, { className: "bg-red text-red-foreground z-50" });
		}

		setOpen(false);
	}

	const DrawerComponent = nested ? NestedDrawer : Drawer;

	return (
		<DrawerComponent open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader className='p-4'>
					<DrawerTitle className='font-medium'>Post deleting</DrawerTitle>
				</DrawerHeader>
				<div className='w-full h-[32.5rem] px-4 flex pb-24 flex-col gap-4 items-center justify-center'>
					<img loading='lazy' src='./static/states-assets/delete.png' className='w-40 h-40' />
					<div className='flex flex-col gap-1'>
						<span className='text-2xl text-center text-foreground font-medium'>
							Are you sure you want to delete the {content === "post" ? "post?" : "comment?"}
						</span>
						<span className='text-lg text-center text-foreground/50'>This action cannot be undone</span>
					</div>
				</div>
				<DrawerFooter className='p-4 fixed flex pb-[calc(8px+var(--safe-area-inset-bottom))] flex-row gap-4 w-full z-10 bg-modal bottom-0'>
					<Button variant='secondary' className='rounded-full' size='full'>
						Cancel
					</Button>
					<Button
						variant='deleting'
						className='rounded-full font-semibold'
						size='full'
						onClick={content === "post" ? deleteBlogRequest : deleteCommentRequest}
						disabled={isLoading}
					>
						Delete
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</DrawerComponent>
	);
}
