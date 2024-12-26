import Post from "../../home/slides/post/post";
import { PageModal } from "../../modals";

export default function PostModal({ post, open, setOpen, user }) {
	return (
		<PageModal open={open}>
			<Post user={user} post={post} />
		</PageModal>
	);
}
