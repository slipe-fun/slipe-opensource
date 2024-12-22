import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, FreeMode } from "swiper/modules";
import { Publication, Comment, Reaction } from "../profile";
import { useState, useEffect } from "react";
import { useStorage } from "@/hooks/contexts/session";
import useSWR from "swr";
import api from "@/constants/api";
import { fetcher } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSWRConfig } from "swr";

import "swiper/css";
import "swiper/css/effect-creative";

export default function Publications({ user }) {
	const [swiper, setSwiper] = useState(null);
	const [active, setActive] = useState(0);
	const { token, storage } = useStorage();
	const { cache, mutate, ...extraConfig } = useSWRConfig();

	const [publicationsPage, setPublicationsPage] = useState(1);
	const [publications, setPublications] = useState([]);

	const [commentsPage, setCommentsPage] = useState(1);
	const [comments, setComments] = useState([]);

	const [reactionsPage, setReactionsPage] = useState(1);
	const [reactions, setReactions] = useState([]);

	const swrPostsKey = user?.id ? `${api.v1}/post/get?page=${publicationsPage}&user=${user?.id}` : null;
	const swrCommentsKey = user?.id ? `${api.v1}/comment/users/get?page=${commentsPage}` : null;
	const swrReactionsKey = user?.id ? `${api.v1}/reactions/users/get?page=${reactionsPage}` : null;

	const { data: publicationsRequest, isPublicationsError, isPublicationsLoading } = useSWR(swrPostsKey, async url => await fetcher(url, "get"));
	const {
		data: commentsRequest,
		isCommentsError,
		isCommentsLoading,
	} = useSWR(swrCommentsKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));
	const {
		data: reactionsRequest,
		isReactionsError,
		isReactionsLoading,
	} = useSWR(swrReactionsKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	const switcherButton = index => {
		setActive(index);
		swiper?.slideTo(index);
	};

	const mutateData = url => {
		mutate(
			swrPostsKey,
			(async () => {
				const updatedData = await fetcher(swrPostsKey, "get", null, { Authorization: "Bearer " + token });
				return updatedData;
			})(),
			false
		);
	};

	useEffect(() => {
		document.getElementById("content-switcher")?.scrollTo({
			left: document.getElementById(`switcher-button-${active}`).offsetLeft - 20,
			behavior: "smooth",
			block: "start",
		});
	}, [active]);

	useEffect(() => {
		if (publicationsRequest?.success && !isPublicationsError) {
			setPublications(prev => [...prev, ...publicationsRequest?.success]);
		}
	}, [publicationsRequest]);
	useEffect(() => {
		if (commentsRequest?.success && !isCommentsError) {
			setComments(prev => [...prev, ...commentsRequest?.success]);
		}
	}, [commentsRequest]);
	useEffect(() => {
		if (reactionsRequest?.success && !isReactionsError) {
			setReactions(prev => [...prev, ...reactionsRequest?.success]);
		}
	}, [reactionsRequest]);

	useEffect(() => mutateData(swrPostsKey), [swrPostsKey]);
	useEffect(() => mutateData(swrCommentsKey), [swrCommentsKey]);
	useEffect(() => mutateData(swrReactionsKey), [swrReactionsKey]);

	return (
		<div className='flex flex-col gap-4'>
			<div id='content-switcher' className='flex gap-6 text-white font-medium text-2xl px-5 overflow-x-auto'>
				<button
					onClick={() => switcherButton(0)}
					id='switcher-button-0'
					data-active={active === 0}
					className='duration-200 ease-out data-[active=true]:opacity-100 opacity-50'
				>
					Publications
				</button>
				<button
					onClick={() => switcherButton(1)}
					id='switcher-button-1'
					data-active={active === 1}
					className='duration-200 ease-out data-[active=true]:opacity-100 opacity-50'
				>
					Comments
				</button>
				<button
					onClick={() => switcherButton(2)}
					id='switcher-button-2'
					data-active={active === 2}
					className='duration-200 ease-out data-[active=true]:opacity-100 opacity-50'
				>
					Reactions
				</button>
			</div>
			<Swiper
				onSwiper={setSwiper}
				resistance={true}
				resistanceRatio={0}
				onActiveIndexChange={slider => setActive(slider.activeIndex)}
				creativeEffect={{
					prev: {
						opacity: 0,
						translate: ["-106%", 0, 0],
					},
					next: {
						opacity: 0,
						translate: ["106%", 0, 0],
					},
				}}
				effect='creative'
				className='w-full px-5 pb-[5.5rem]'
				slidesPerView={1}
				modules={[FreeMode, EffectCreative]}
			>
				<SwiperSlide>
					{publications?.length > 0 ? (
						<InfiniteScroll
							hasMore={publications?.length < Number(user?.postsCount)}
							next={() => setPublicationsPage(publicationsPage => publicationsPage + 1)}
							scrollableTarget='profileScroll'
							dataLength={publications?.length}
							className='grid grid-cols-2 h-fit gap-5'
						>
							{publications?.map((post, index) => (
								<Publication key={index} post={post} />
							))}
						</InfiniteScroll>
					) : null}
				</SwiperSlide>
				<SwiperSlide>
					{comments?.length > 0 ? (
						<InfiniteScroll
							hasMore={comments?.length < Number(commentsRequest?.count)}
							next={() => setCommentsPage(commentsPage => commentsPage + 1)}
							scrollableTarget='profileScroll'
							dataLength={comments?.length}
							className='flex flex-col h-fit gap-5'
						>
							{comments?.map((comment, index) => (
								<Comment key={index} user={user} content={comment.text} date={comment?.date} />
							))}
						</InfiniteScroll>
					) : null}
				</SwiperSlide>
				<SwiperSlide>
					{reactions?.length > 0 ? (
						<InfiniteScroll
							hasMore={reactions?.length < Number(reactionsRequest?.count)}
							next={() => setReactionsPage(reactionsPage => reactionsPage + 1)}
							scrollableTarget='profileScroll'
							dataLength={reactions?.length}
							className='grid grid-cols-3 h-fit gap-5'
						>
							{reactions?.map((reaction, index) => (
								<Reaction key={index} reaction={reaction.name} post={reaction.post} />
							))}
						</InfiniteScroll>
					) : null}
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
