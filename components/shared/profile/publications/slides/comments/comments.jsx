import api from "@/constants/api";
import { fetcher, GetUniqueById } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "./comment";
import { useState, useEffect } from "react";
import NoContent from "@/components/shared/no-content";
import { Skeleton } from "@/components/ui/skeleton";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";

export default function Comments({ user, token }) {
	const [page, setPage] = useState(1);
	const [comments, setComments] = useState([]);
	const [deletedComments, setDeletedComments] = useState([]);

	const swrKey = `${api.v1}/comment/users/get?page=${page}`;

	const {
		data: commentsRequest,
		error: isError,
		isLoading: isLoading,
		mutate: mutate,
	} = useCacheFetcher(swrKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	function deleteComment(id) {
		const comment = comments.find(comment => comment?.id === id);

		setDeletedComments(prev => [...prev, comment]);
	}

	function isCommentDeleted(comment) {
		return !deletedComments.find(comm => comm?.id === comment?.id);
	}

	useEffect(() => {
		if (commentsRequest?.success && !isError) {
			setComments(prev => GetUniqueById([...prev, ...commentsRequest?.success]));
		}
	}, [commentsRequest]);

	if (isError)
		return <NoContent image='error.png' title='No data' primary='Try reloading the page or app' className='py-12 animate-[fadeIn_0.3s_ease-out]' />;

	return (
		<>
			{isLoading ? (
				<div className='flex flex-col h-fit gap-5'>
					{Array.from({ length: 6 }, (_, i) => i).map(index => (
						<Skeleton key={index} className='w-full h-32 rounded-[1.25rem]' />
					))}
				</div>
			) : comments?.filter(isCommentDeleted) ? (
				<InfiniteScroll
					hasMore={comments?.length < Number(commentsRequest?.count)}
					next={() => {
						setPage(prev => prev + 1);
					}}
					scrollableTarget='profileScroll'
					dataLength={comments?.length}
					className='flex flex-col h-fit gap-5'
				>
					{comments?.filter(isCommentDeleted)?.map((comment, index) => (
						<Comment key={index} user={user} comment={comment} date={comment?.date} deleteComment={deleteComment} />
					))}
				</InfiniteScroll>
			) : (
				<NoContent
					title='No comments here yet'
					image='comment.png'
					className='py-12 animate-[fadeIn_0.3s_ease-out]'
					primary="You haven't written any comments yet"
				/>
			)}
		</>
	);
}
