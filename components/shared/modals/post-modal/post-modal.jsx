import { useState } from "react";
import { PageModal } from "../../modals";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import { useStorage } from "@/hooks/contexts/session";
import { fetcher } from "@/lib/utils";
import Header from "./header";
import { motion } from "framer-motion";
import api from "@/constants/api";
import { toast } from "sonner";
import CommentInput from "../comments/comment-input";
import ContentSlider from "./content-slider";

export default function PostModal({ post, open, setOpen, user, setUser }) {
	const [inputFocus, setInputFocus] = useState(false);
	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [commentsCount, setCommentsCount] = useState(0);
	const [isTransition, setIsTransition] = useState(false);
	const [isButtonLoading, setIsButtonLoading] = useState(false);
	const [progess, setProgess] = useState(0);
	const { token, storage } = useStorage();

	async function sendComment() {
		setIsButtonLoading(true);

		const formData = new FormData();
		formData.append("text", commentText);
		formData.append("post_id", post?.id);

		const result = await fetcher(api.v1 + `/comment/publish`, "post", formData, { Authorization: "Bearer " + token });

		if (result?.success) {
			setComments([
				{
					...result?.comment,
					likes: 0,
					liked: false,
					author: user,
				},
				...comments,
			]);
			setCommentsCount(commentsCount + 1);
			setCommentText("");
		} else toast.error(result?.error, { className: "bg-red text-red-foreground z-50" });

		setIsButtonLoading(false);
	}

	return (
		<PageModal className='flex justify-center flex-col items-center bg-background backdrop-blur-lg' open={open}>
			<Header inputFocus={inputFocus} setOpen={setOpen} post={post} user={user} />
			<ContentSlider
				comments={comments}
				setComments={setComments}
				inputFocus={inputFocus}
				setProgess={setProgess}
				setIsTransition={setIsTransition}
				user={user}
				setUser={setUser}
				post={post}
				commentsCount={commentsCount}
				setCommentsCount={setCommentsCount}
			/>
			<motion.div
				style={{ opacity: progess }}
				data-transition={isTransition}
				data-touchable={progess === 1}
				className='w-full p-5 gap-5 data-[touchable=true]:pointer-events-auto items-end pointer-events-none data-[transition=true]:duration-200 flex bottom-0 z-50 bg-background/90 fixed backdrop-blur-2xl'
			>
				<CommentInput
				className="bg-foreground/[0.12]"
					sendComment={sendComment}
					isButtonLoading={isButtonLoading}
					setInputFocus={setInputFocus}
					user={user}
					commentText={commentText}
					setCommentText={setCommentText}
				/>
			</motion.div>
		</PageModal>
	);
}
