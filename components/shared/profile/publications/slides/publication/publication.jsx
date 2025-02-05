import { PostModal } from "@/components/shared/modals";
import Img from "@/components/ui/image";
import cdn from "@/constants/cdn";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Publication({ className, post, user, isModal, ...props }) {
	const [open, setOpen] = useState(false);
	const [_, setUser] = useState(false);

	return (
		<>
			<div
				onClick={() => setOpen(true)}
				className={cn(
					"w-full aspect-[37/57] overflow-hidden relative flex animate-[fadeInOpacity_0.3s_ease-out] items-end rounded-[1.125rem]",
					className
				)}
				{...props}
			>
				<Img src={cdn + "/posts/" + post?.image} wrapperClassName="w-full h-full -z-20 absolute" className="object-cover"/>
				<span className='w-full h-full absolute bg-gradient-to-t -z-10 from-[#00000040] to-[#00000000] block' />
				<div className='p-4 gap-[0.125rem] flex w-full flex-col text-white'>
					<span className='font-medium break-words text-lg whitespace-nowrap text-ellipsis overflow-hidden w-full'>
						{post?.in_search || "No name."}
					</span>
					<span className='opacity-75 text-sm'>{post?.views || 0} views</span>
				</div>
			</div>
			<PostModal isModal={isModal} setUser={setUser} setOpen={setOpen} open={open} user={user} post={post} />
		</>
	);
}
