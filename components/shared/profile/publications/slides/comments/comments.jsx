import api from "@/constants/api";
import { fetcher, GetUniqueById } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "./comment";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";

export default function Comments({ user, token }) {
	const [page, setPage] = useState(1);
	const [comments, setComments] = useState([]);

	const swrKey = `${api.v1}/comment/users/get?page=${page}`;

	const {
		data: commentsRequest,
		error: isError,
		isLoading: isLoading,
	} = useCacheFetcher(swrKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	useEffect(() => {
		if (commentsRequest?.success && !isError) {
			setComments(prev => GetUniqueById([...prev, ...commentsRequest?.success]));
		}
	}, [commentsRequest]);

	if (isError) return <>Error</>;
	if (isLoading)
		return (
			<div className='flex flex-col h-fit gap-5'>
				{Array.from({ length: 6 }, (_, i) => i).map(index => (
					<Skeleton key={index} className="w-full h-32 rounded-[1.25rem]" />
				))}
			</div>
		);

	return comments?.length > 0 ? (
		<InfiniteScroll
			hasMore={comments?.length < Number(commentsRequest?.count)}
			next={() => setPage(prev => prev + 1)}
			scrollableTarget='profileScroll'
			dataLength={comments?.length}
			className='flex flex-col h-fit gap-5'
		>
			{comments?.map((comment, index) => (
				<Comment key={index} user={user} content={comment.text} date={comment?.date} />
			))}
		</InfiniteScroll>
	) : null;
}
