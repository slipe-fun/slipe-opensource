import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import CommentBlock from "./comment-block";
import Svg from "@/components/ui/icons/svg";
import { Button } from "@/components/ui/button";
import icons from "@/components/ui/icons/icons";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useCallback } from "react";
import { fetcher } from "@/lib/utils";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import PixelAvatar from "../../pixels-avatar";
import { useStorage } from "@/hooks/contexts/session";
import { motion, AnimatePresence } from "motion/react";
import api from "@/constants/api";
import cdn from "@/constants/cdn";
import { Skeleton } from "@/components/ui/skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CommentsModal({ children, postId, open, setOpen }) {
	const [inputFocus, setInputFocus] = useState(false);
	const [page, setPage] = useState(1);
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState([]);
	const [commentsCount, setCommentsCount] = useState(0);
	const [isButtonLoading, setIsButtonLoading] = useState(false);
	const { token, storage } = useStorage();

	const swrKey = open ? `${api.v1}/comment/get?post_id=${postId}&page=${page}` : null;
	// const date = Date.now();
	const { cache, mutate, ...extraConfig } = useSWRConfig();

	const {
		data: commentsRequest,
		error,
		isLoading
	} = useSWR(swrKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));
	const {
		data: user,
		userError,
		isUserLoading,
	} = useSWR(api.v1 + "/account/info/get", async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	async function sendComment() {
		setIsButtonLoading(true);

		const formData = new FormData();
		formData.append("text", commentText);
		formData.append("post_id", postId);

		const result = await fetcher(api.v1 + `/comment/publish`, "post", formData, { Authorization: "Bearer " + token });

		if (result?.success) {
			setComments([
				{
					id: 0,
					text: commentText,
					likes: 0,
					liked: false,
					author: user?.success[0],
				},
				...comments,
			]);
			setCommentsCount(commentsCount + 1);
			setCommentText("");
		} else toast.error(result?.error, { className: "bg-red text-red-foreground" });

		setIsButtonLoading(false);
	}

	function adjustHeight(element) {
		element.style.height = "48px";
		element.style.height = `${element.scrollHeight}px`;
	}

	useEffect(() => {
		if (commentsRequest?.success && !error) {
			const newComments = commentsRequest.success.filter(newComment => !comments.some(existingComment => existingComment.id === newComment.id));

			if (newComments.length > 0) {
				setComments(prev => [...prev, ...newComments]);
			}
			setCommentsCount(Number(commentsRequest?.count));
		}
	}, [commentsRequest, error]);

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
				<ul
					id='commentsScroll'
					data-shadowed={inputFocus}
					className='w-full duration-200 !h-[31.5rem] overflow-y-auto ease-out data-[shadowed=true]:opacity-40 px-5 relative pb-[5.5rem] flex flex-col gap-4'
				>
					{comments?.length > 0 ? (
						<InfiniteScroll
							hasMore={comments?.length < Number(commentsCount)}
							dataLength={Number(commentsCount)}
							next={() => setPage(page + 1)}
							scrollableTarget='commentsScroll'
							className='flex flex-col gap-4'
						>
							<AnimatePresence initial={false}>
								{comments?.map((comment, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										layout
										className='flex origin-center flex-col gap-2'
									>
										<CommentBlock
											id={comment.id}
											user={comment.author}
											content={comment.text}
											likes={comment.likes}
											liked={comment.liked}
											date={comment.date}
											updateComment={async (id, likes, liked) => {
												const commentsLocal = comments;
												const comment = commentsLocal.find(comment => comment?.id === id);
												const commentIndex = commentsLocal.indexOf(comment);
												const commentPage =  [...Array(Math.ceil(commentsLocal?.length / 12)).keys()].map(key => key + 1).find(key => index < key * 12)
												commentsLocal[commentIndex].likes = likes;
												commentsLocal[commentIndex].liked = liked;
												mutate(`${api.v1}/comment/get?post_id=${postId}&page=${commentPage}`);
												setComments(commentsLocal);
											}}
										/>
									</motion.li>
								))}
							</AnimatePresence>
						</InfiniteScroll>
					) : (
						<>
							{Array.from({ length: 10 }, (_, i) => i).map(index => (
								<Skeleton key={index} className='w-full rounded-3xl min-h-32' />
							))}
						</>
					)}
				</ul>

				<DrawerFooter id='categories-scroller' className='p-5 w-full flex-row fixed items-end bottom-0 bg-modal z-10 flex gap-4'>
					{!error ? (
						<>
							{user?.success[0].avatar ? (
								<img
									loading='lazy'
									className='rounded-full min-w-12 object-cover bg-center w-12 h-12'
									src={`${cdn}/avatars/${user?.success[0]?.avatar}`}
								/>
							) : (
								<PixelAvatar size={48} username={user?.success[0]?.username} pixels={user?.success[0]?.pixel_order} />
							)}
						</>
					) : null}
					<Textarea
						onFocus={() => setInputFocus(true)}
						onBlur={() => setInputFocus(false)}
						maxLength={200}
						value={commentText}
						onChange={e => {
							setCommentText(e.target.value);
							if (e.target.scrollHeight > e.target.offsetHeight) adjustHeight(e.target);
						}}
						className='bg-foreground/[0.08] h-12 max-h-32 resize-none rounded-3xl text-sm p-[0.875rem]'
						placeholder='Type something'
					/>
					<Button disabled={isButtonLoading} size='icon' className='rounded-full min-h-12 h-12 w-12 min-w-12' onClick={sendComment}>
						<Svg className='!w-7 !h-7' icon={icons["paperPlane"]} />
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
