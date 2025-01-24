import api from "@/constants/api";
import { fetcher, GetUniqueById } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Publication from "./publication";
import { useState, useEffect } from "react";
import NoContent from "@/components/shared/no-content";
import { Skeleton } from "@/components/ui/skeleton";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";

export default function Posts({ user, token, isModal, dateId }) {
	const [page, setPage] = useState(1);
	const [publications, setPublications] = useState([]);

	const urlKey = `${api.v1}/post/get?page=${page}&user=${user?.id}`;

	const {
		data: publicationsRequest,
		isLoading: isLoading,
		error: isError,
	} = useCacheFetcher(urlKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	useEffect(() => {
		if (publicationsRequest?.success && !isError) {
			setPublications(prev => GetUniqueById([...prev, ...publicationsRequest?.success]));
		}
	}, [publicationsRequest]);

	if (user?.postsCount === "0") {
		return <NoContent
			title='No posts here yet'
			image='post.png'
			className='py-12 animate-[fadeIn_0.3s_ease-out]'
			primary="You haven't published any posts yet"
		/>
	}

	if (isError)
		return <NoContent image='error.png' title='No data' primary='Try reloading the page or app' className='py-12 animate-[fadeIn_0.3s_ease-out]' />;

	return (
		<>
			{publications ? (
				<InfiniteScroll
					hasMore={publications?.length < Number(user?.postsCount)}
					next={() => setPage(prev => prev + 1)}
					scrollableTarget={isModal ? `profileScrollModal-${dateId}` : 'profileScroll'}
					dataLength={publications?.length}
					className='grid grid-cols-2 h-fit gap-4'
				>
					{publications?.map((post, index) => (
						<Publication isModal={isModal} key={index} post={post} user={user} />
					))}
				</InfiniteScroll>
			) : null}
			{isLoading ? (
				<div className='grid grid-cols-2 h-fit gap-4'>
					{Array.from({ length: 8 }, (_, i) => i).map(index => (
						<Skeleton key={index} className='w-full animate-[fadeInOpacity_0.3s_ease-out] aspect-[37/57] rounded-[1.125rem]' />
					))}
				</div>
			) : null}
		</>
	);
}
