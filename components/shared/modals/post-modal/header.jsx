import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import { PostInfoModal } from "../../modals";
import { useState } from "react";

export default function Header({ post, user, setOpen, inputFocus, setDeletedBlog }) {
	const [isInfo, setIsInfo] = useState(false);
	return (
		<div
			data-shadowed={inputFocus}
			className='w-full p-4 pt-[calc(1rem+var(--safe-area-inset-top))] gap-7 data-[shadowed=true]:opacity-40 duration-200 ease-out flex top-0 border-b-[1px] border-foreground/10 z-50 bg-navigation items-center fixed backdrop-blur-[80px]'
		>
			<Button
				onClick={() => setOpen(false)}
				size='icon'
				variant='secondary'
				className='rounded-full bg-foreground/[0.08] hover:foreground[0.06]'
			>
				<Svg className='!w-[1.625rem] !h-[1.625rem]' icon={icons["chevronLeft"]} />
			</Button>
			<div className='w-full h-full flex overflow-hidden items-center justify-center flex-col'>
				<span className='font-medium overflow-hidden w-full whitespace-nowrap max-w-fit text-center text-ellipsis'>
					{post?.in_search || "Untitled post"}
				</span>
				<span className='opacity-50 overflow-hidden w-full whitespace-nowrap text-sm text-center max-w-fit text-ellipsis'>@{user?.username}</span>
			</div>
			<PostInfoModal deleteBlog={setDeletedBlog} post={post} open={isInfo} setOpen={setIsInfo}>
				<Button
					data-active={isInfo}
					size='icon'
					variant='secondary'
					className='rounded-full data-[active=true]:bg-foreground data-[active=true]:text-background bg-foreground/[0.08] hover:bg-foreground[0.06]'
				>
					<Svg className='!w-[1.625rem] !h-[1.625rem]' icon={icons["menu"]} />
				</Button>
			</PostInfoModal>
		</div>
	);
}
