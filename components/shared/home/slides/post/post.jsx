import UserBlock from "./user-block";
import ActionsBlock from "./actions-block";
import cdn from "@/constants/cdn";

export default function Post({ user, setUser, post, isPostDeleted }) {

	return (
		<div
			className='flex bg-[#161616] w-[calc(200%-2.5rem)] absolute rounded-[2rem] justify-between h-full overflow-hidden items-center flex-col'
		>
			<UserBlock user={user} setUser={setUser} date={post?.date} />
			<img loading='lazy' src={cdn + `/posts/${post?.image}`} className='w-full object-contain h-full absolute top-0 block' />
			<ActionsBlock id={post?.id} currentReaction={post.reaction} reactions={post.reactions} />
		</div>
	);
}
