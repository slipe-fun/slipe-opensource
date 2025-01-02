import api from "@/constants/api";
import { fetcher, GetUniqueById } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Reaction from "./reaction";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import NoContent from "@/components/shared/no-content";

export default function Reactions({ token, isModal }) {
	const [page, setPage] = useState(1);
	const [reactions, setReactions] = useState([]);
	const urlKey = `${api.v1}/reactions/users/get?page=${page}`;

	const {
		data: reactionsRequest,
		isLoading: isLoading,
		error: isError,
	} = useCacheFetcher(urlKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	useEffect(() => {
		if (reactionsRequest?.success && !isError) {
			setReactions(prev => GetUniqueById([...prev, ...reactionsRequest?.success]));
		}
	}, [reactionsRequest]);

	if (isError)
		return (
			<NoContent image='error.png' title='No data' primary='Try reloading the page or app' className='min-h-[50vh] animate-[fadeIn_0.3s_ease-out]' />
		);

	return (
		<>
			{reactions ? (
				<InfiniteScroll
					hasMore={reactions?.length < Number(reactionsRequest?.count)}
					next={() => setPage(page => page + 1)}
					scrollableTarget={isModal ? `profileScrollModal-${user?.id}` : 'profileScroll'}
					dataLength={reactions?.length}
					className='grid grid-cols-3 h-fit min-h-[50vh] gap-5'
				>
					{reactions?.map((reaction, index) => (
						<Reaction key={index} reaction={reaction.name} post={reaction.post} />
					))}
				</InfiniteScroll>
			) : (
				<NoContent
					title='No reactions here yet'
					image='reaction.png'
					className='min-h-[50vh] animate-[fadeIn_0.3s_ease-out]'
					primary="You haven't set any reactions yet"
				/>
			)}
			{isLoading ? (
				<div className='grid grid-cols-3 h-fit gap-5'>
					{Array.from({ length: 12 }, (_, i) => i).map(index => (
						<Skeleton key={index} className='w-full aspect-square rounded-[1.125rem]' />
					))}
				</div>
			) : null}
		</>
	);
}
