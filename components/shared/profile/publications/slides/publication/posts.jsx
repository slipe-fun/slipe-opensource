import api from "@/constants/api";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Publication from "./publication";
import { useState, useEffect } from "react";
import mutateData from "@/lib/utils/mutateData";

export default function Posts({ user, token, mutate }) {
	const [page, setPage] = useState(1);
	const [publications, setPublications] = useState([]);

	const swrKey = `${api.v1}/post/get?page=${page}&user=${user?.id}`;

	const { data: publicationsRequest, isLoading, isError } = useSWR(swrKey, async url => await fetcher(url, "get"));

	useEffect(() => {
		if (publicationsRequest?.success && !isError) {
			setPublications(prev => [...prev, ...publicationsRequest?.success]);
		}
	}, [publicationsRequest]);

	useEffect(() => mutateData(swrKey, mutate, token), [swrKey]);

	if (isError) return <>Error</>;
	if (isLoading) return <>Loading</>;

	return publications?.length > 0 ? (
		<InfiniteScroll
			hasMore={publications?.length < Number(user?.postsCount)}
			next={() => setPage(prev => prev + 1)}
			scrollableTarget='profileScroll'
			dataLength={publications?.length}
			className='grid grid-cols-2 h-fit gap-5'
		>
			{publications?.map((post, index) => (
				<Publication key={index} post={post} />
			))}
		</InfiniteScroll>
	) : null;
}
