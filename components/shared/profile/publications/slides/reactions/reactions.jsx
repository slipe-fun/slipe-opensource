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
	const has = async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token })

	const urlKey = `${api.v1}/reactions/users/get?page=${page}`;

	const {
		data: reactionsRequest,
		isLoading: isLoading,
		error: isError,
	} = useCacheFetcher(urlKey, has);

	useEffect(() => {
		if (reactionsRequest?.success && !isError) {
			setReactions(prev => getUniqueById([...prev, ...reactionsRequest?.success]));
		}
	}, [reactionsRequest]);

	if (isError) return console.log(isError);
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
			hasMore={reactions?.length < Number(reactionsRequest?.count)}
			next={() => console.log(12)}
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
