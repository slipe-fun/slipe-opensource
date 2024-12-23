import api from "@/constants/api";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "./comment";
import { useState, useEffect } from "react";
import mutateData from "@/lib/utils/mutateData";

export default function Comments({ user, token, mutate }) {
	const [page, setPage] = useState(1);
	const [comments, setComments] = useState([]);

	const swrKey = `${api.v1}/comment/users/get?page=${page}`;

	const {
		data: commentsRequest,
		isError,
		isLoading,
	} = useSWR(swrKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	useEffect(() => {
		if (commentsRequest?.success && !isError) {
			setComments(prev => [...prev, ...commentsRequest?.success]);
		}
	}, [commentsRequest]);

	useEffect(() => mutateData(swrKey, mutate, token), [swrKey]);

	if (isError) return <>Error</>;
	if (isLoading) return <>Loading</>;

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
