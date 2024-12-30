import api from "@/constants/api";
import { fetcher, GetUniqueById } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Publication from "./publication";
import { useState, useEffect } from "react";
import NoContent from "@/components/shared/no-content";
import { Skeleton } from "@/components/ui/skeleton";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";

export default function Posts({ user, token }) {
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

	if (isError)
		return <NoContent image='error.png' title='No data' primary='Try reloading the page or app' className='min-h-[50vh] animate-[fadeIn_0.3s_ease-out]' />;
	if (isLoading)
		return (
			<div className='grid grid-cols-2 h-fit gap-5'>
				{Array.from({ length: 8 }, (_, i) => i).map(index => (
					<Skeleton key={index} className='w-full animate-[fadeInOpacity_0.3s_ease-out] aspect-[37/57] rounded-[1.125rem]' />
				))}
			</div>
		);

	return publications?.length > 0 ? (
		<InfiniteScroll
			hasMore={publications?.length < Number(user?.postsCount)}
			next={() => setPage(prev => prev + 1)}
			scrollableTarget='profileScroll'
			dataLength={publications?.length}
			className='grid grid-cols-2 h-fit min-h-[50vh] gap-5'
		>
			{publications?.map((post, index) => (
				<Publication key={index} post={post} user={user} />
			))}
		</InfiniteScroll>
	) : (
		<NoContent
			title='No posts here yet'
			image='post.png'
			className='min-h-[50vh] animate-[fadeIn_0.3s_ease-out]'
			primary="You haven't published any posts yet"
		/>
	);
}
