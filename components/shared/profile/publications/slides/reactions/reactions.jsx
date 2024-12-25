import api from "@/constants/api";
import { fetcher } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Reaction from "./reaction";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import getUniqueById from "@/lib/utils/uniqueById";

export default function Reactions({ token }) {
	const [page, setPage] = useState(1);
	const [reactions, setReactions] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	const urlKey = `${api.v1}/reactions/users/get?page=${page}`;

	const {
		data: reactionsRequest,
		error: isError,
		isLoading: isLoading,
	} = useCacheFetcher(urlKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	useEffect(() => {
		if (reactionsRequest?.success && !isError) {
			setReactions(prev => getUniqueById([...prev, ...reactionsRequest?.success]));
		}
		console.log(123);
	}, [reactionsRequest, isError]);

	if (isError) return <>Error</>;
	if (isLoading)
		return (
			<div className='grid grid-cols-3 h-fit gap-5'>
				{Array.from({ length: 12 }, (_, i) => i).map(index => (
					<Skeleton key={index} className="w-full aspect-square rounded-[1.125rem]" />
				))}
			</div>
		);

	return reactions?.length > 0 ? (
		<InfiniteScroll
			hasMore={reactionsRequest?.success.length < reactionsRequest?.count}
			next={() => setPage(prev => prev + 1)}
			scrollableTarget='profileScroll'
			dataLength={reactions?.length}
			className='grid grid-cols-3 h-fit gap-5'
		>
			{reactions?.map((reaction, index) => (
				<Reaction key={index} reaction={reaction.name} post={reaction.post} />
			))}
		</InfiniteScroll>
	) : null;
}
