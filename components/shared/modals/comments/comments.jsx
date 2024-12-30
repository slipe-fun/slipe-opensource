import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { fetcher } from "@/lib/utils";
import { toast } from "sonner";
import { useStorage } from "@/hooks/contexts/session";
import api from "@/constants/api";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import CommentInput from "./comment-input";
import CommentsBlock from "./comments-block";

export default function CommentsModal({ children, postId, open, setOpen }) {
	const [inputFocus, setInputFocus] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState([]);
	const [commentsCount, setCommentsCount] = useState(0);
	const [isButtonLoading, setIsButtonLoading] = useState(false);
	const { token, storage } = useStorage();

	const {
		data: user,
		error: userError,
		isLoading: isUserLoading,
	} = useCacheFetcher(api.v1 + "/account/info/get", async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }), {
		cache: true
	});

	async function sendComment() {
		setIsButtonLoading(true);

		const formData = new FormData();
		formData.append("text", commentText);
		formData.append("post_id", postId);

		const result = await fetcher(api.v1 + `/comment/publish`, "post", formData, { Authorization: "Bearer " + token });

		if (result?.success) {
			setComments([
				{
					...result?.comment,
					likes: 0,
					liked: false,
					author: user?.success[0],
				},
				...comments,
			]);
			setCommentsCount(commentsCount + 1);
			setCommentText("");
		} else toast.error(result?.error, { className: "bg-red text-red-foreground z-50" });

		setIsButtonLoading(false);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader
					data-shadowed={inputFocus}
					className='p-5 duration-200 ease-out data-[shadowed=true]:opacity-30 data-[shadowed=true]:pointer-events-none'
				>
					<DrawerTitle className='font-medium'>{commentsCount ? commentsCount : 0} comments</DrawerTitle>
				</DrawerHeader>
				<CommentsBlock
					setCommentsCount={setCommentsCount}
					commentsCount={commentsCount}
					comments={comments}
					postId={postId}
					setComments={setComments}
					inputFocus={inputFocus}
				/>
				<DrawerFooter id='categories-scroller' className='p-5 w-full flex-row fixed items-end bottom-0 bg-modal z-10 flex gap-5'>
					<CommentInput
						setCommentText={setCommentText}
						sendComment={sendComment}
						isButtonLoading={isButtonLoading}
						commentText={commentText}
						error={userError}
						user={user?.success[0]}
						setInputFocus={setInputFocus}
					/>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
