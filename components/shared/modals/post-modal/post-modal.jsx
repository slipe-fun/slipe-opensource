import Post from "../../home/slides/post/post";
import { PageModal } from "../../modals";
import { useClickAway } from "react-use";
import { useRef } from "react";

export default function PostModal({ post, open, setOpen, user, setUser }) {
	const postModalRef = useRef(null);

	useClickAway(postModalRef, () => {
		setOpen(false);
	});

	return (
		<PageModal className='flex justify-center py-[6.5rem] flex-col items-center bg-background/80 px-5 backdrop-blur-lg' open={open}>
			<Post ref={postModalRef} className="w-full relative" user={user} setUser={setUser} post={post} />
		</PageModal>
	);
}
