import UserBlock from "./user-block";
import ActionsBlock from "./actions-block";
import cdn from "@/constants/cdn";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Post = forwardRef(({ user, setUser, post, isPostDeleted, className, isPostModal, ...props }, ref) => {
	return (
		<div
			ref={ref}
			{...props}
			className={cn(
				"flex bg-[#242424] w-[calc(200%-2rem)] absolute rounded-[1.75rem] justify-between h-full overflow-hidden items-center flex-col",
				className
			)}
		>
			<UserBlock user={user} setUser={setUser} date={post?.date} />
			<img loading='lazy' src={cdn + `/posts/${post?.image}`} className='w-full object-contain h-full absolute top-0 block' />
			<ActionsBlock isPostModal={isPostModal} post={post} currentReaction={post.reaction} reactions={post.reactions} />
		</div>
	);
});

export default Post;
