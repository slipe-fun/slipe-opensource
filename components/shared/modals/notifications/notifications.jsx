import { PageModal } from "../../modals";
import Header from "./header";
import SwitcherBar from "./switcher-bar";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { EffectCreative } from "swiper/modules";
import ReactionBlock from "./blocks/reaction";
import FollowBlock from "./blocks/follow";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";
import { fetcher, GetUniqueById } from "@/lib/utils";
import CommentBlock from "./blocks/comment";

import "swiper/css";
import "swiper/css/effect-creative";

export default function NotificationsModal({ open, setOpen }) {
	const [swiper, setSwiper] = useState(null);
	const [active, setActive] = useState(0);

	const [reactions, setReactions] = useState([]);
	const [subscribers, setSubscribers] = useState([]);
	const [comments, setComments] = useState([]);
	const [pages, setPages] = useState([1, 1, 1]);
	const [counts, setCounts] = useState([0, 0, 0]);
	const { token, store } = useStorage();
	const [reloadCounts, setReloadCounts] = useState(1)

	const types = ["reaction", "subscribe", "comment"];
	const url = open ? `${api.v1}/notifications/get?page=${pages[active]}&type=${types[active]}&${reloadCounts}` : null;

	const {
		data: notificationsRequest,
		error: notificationsError,
		isLoading: notificationsLoading,
	} = useCacheFetcher(url, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	useEffect(() => {
		swiper?.slideTo(active);
	}, [active]);

	useEffect(() => {
		if (!notificationsError && !notificationsLoading) {
			const notificationType = notificationsRequest?.success[0]?.type || types[active];

			setCounts(prev => prev.map((count, index) => (index === types.indexOf(notificationType) ? notificationsRequest?.count : count)));

			switch (notificationType) {
				case "reaction":
					setReactions(GetUniqueById([...reactions, ...notificationsRequest?.success]));
					break;
				case "subscribe":
					setSubscribers(GetUniqueById([...subscribers, ...notificationsRequest?.success]));
					break;
				case "comment":
					setComments(GetUniqueById([...comments, ...notificationsRequest?.success]));
					break;
				default:
					break;
			}
		}
	}, [notificationsRequest]);

	function addPage(newValue) {
		setPages(prev => prev.map((page, index) => (index === active ? (typeof newValue === "function" ? newValue(page) : newValue) : page)));
	}

	return (
		<PageModal open={open}>
			<Header setOpen={setOpen} reload={() => { setReactions([]); setComments([]); setSubscribers([]); setPages([1, 1, 1]); setReloadCounts(prev => prev + 1) }} count={counts[active]} />
			<div className='flex flex-col overflow-hidden duration-300 ease-out bg-background w-full h-full'>
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
					className='w-full h-full px-4'
					slidesPerView={1}
					modules={[EffectCreative]}
				>
					<SwiperSlide
						id='notifisReactions'
						className='!overflow-y-scroll h-full pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(5.9375rem+var(--safe-area-inset-bottom))]'
					>
						<InfiniteScroll
							hasMore={reactions?.length < Number(counts[0])}
							dataLength={Number(counts[0])}
							next={() => addPage(prev => prev + 1)}
							scrollableTarget='notifisReactions'
							className='space-y-4'
						>
							{!notificationsError ? reactions.map(notification => <ReactionBlock notification={notification} token={token} />) : null}
						</InfiniteScroll>
					</SwiperSlide>
					<SwiperSlide
						id='notifisFollows'
						className='!overflow-y-scroll h-full space-y-4 pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(5.9375rem+var(--safe-area-inset-bottom))]'
					>
						<InfiniteScroll
							hasMore={subscribers?.length < Number(counts[1])}
							dataLength={Number(counts[1])}
							next={() => addPage(prev => prev + 1)}
							scrollableTarget='notifisFollows'
							className='space-y-4'
						>
							{!notificationsError ? subscribers.map(notification => <FollowBlock notification={notification} token={token} />) : null}
						</InfiniteScroll>
					</SwiperSlide>
					<SwiperSlide className='!overflow-y-scroll h-full space-y-4 pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(5.9375rem+var(--safe-area-inset-bottom))]'>
						<InfiniteScroll
							hasMore={comments?.length < Number(counts[2])}
							dataLength={Number(counts[2])}
							next={() => addPage(prev => prev + 1)}
							scrollableTarget='notifisComments'
							className='space-y-4'
						>
							{!notificationsError ? comments.map(notification => <CommentBlock notification={notification} token={token} />) : null}
						</InfiniteScroll>
					</SwiperSlide>
				</Swiper>
			</div>
			<SwitcherBar active={active} setActive={setActive} />
		</PageModal>
	);
}
