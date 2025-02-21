import { PageModal } from "../../modals";
import Header from "./header";
import SwitcherBar from "./switcher-bar";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { EffectCreative } from "swiper/modules";
import ReactionBlock from "./blocks/reaction";
import { Skeleton } from "@/components/ui/skeleton";
import FollowBlock from "./blocks/follow";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import api from "@/constants/api";
import NoContent from "../../no-content";
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
	const [reloadCounts, setReloadCounts] = useState(1);

	const types = ["reaction", "subscribe", "comment"];
	const url = open ? `${api.v1}/notifications/get?page=${pages[active]}&type=${types[active]}&${reloadCounts}` : null;

	const {
		data: notificationsRequest,
		error: notificationsError,
		isLoading: notificationsLoading,
	} = useCacheFetcher(url, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	useEffect(() => {
		swiper?.slideTo(active);
	}, [active, swiper]);

	useEffect(() => {
		if (!notificationsError && !notificationsLoading && notificationsRequest) {
			const notificationType = notificationsRequest?.success[0]?.type || types[active];

			setCounts(prev => prev.map((count, index) => (index === types.indexOf(notificationType) ? notificationsRequest?.count : count)));

			switch (notificationType) {
				case "reaction":
					setReactions(prev => GetUniqueById([...prev, ...notificationsRequest?.success]));
					break;
				case "subscribe":
					setSubscribers(prev => GetUniqueById([...prev, ...notificationsRequest?.success]));
					break;
				case "comment":
					setComments(prev => GetUniqueById([...prev, ...notificationsRequest?.success]));
					break;
				default:
					break;
			}
		}
	}, [notificationsRequest, notificationsError, notificationsLoading, active]);

	function addPage(newValue) {
		setPages(prev => prev.map((page, index) => (index === active ? (typeof newValue === "function" ? newValue(page) : newValue) : page)));
	}

	return (
		<PageModal open={open}>
			<Header
				setOpen={setOpen}
				reload={() => {
					setReactions([]);
					setComments([]);
					setSubscribers([]);
					setPages([1, 1, 1]);
					setReloadCounts(prev => prev + 1);
				}}
				count={counts[active]}
			/>
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
							hasMore={reactions.length < Number(counts[0])}
							dataLength={reactions.length}
							next={() => addPage(prev => prev + 1)}
							scrollableTarget='notifisReactions'
							className='space-y-4'
						>
							{!notificationsError &&
								reactions.map(notification => <ReactionBlock key={notification.id} notification={notification} token={token} />)}
							{notificationsLoading &&
								Array.from({ length: 10 }, (_, i) => i).map(index => <Skeleton key={index} className='w-full rounded-lg min-h-24' />)}
							{!notificationsLoading && reactions.length === 0 && (
								<NoContent
									title='No notifications here yet'
									primary="maybe they'll be here soon"
									className='h-full animate-[fadeIn_0.3s_ease-out]'
									image='nothing.png'
								/>
							)}
						</InfiniteScroll>
					</SwiperSlide>
					<SwiperSlide
						id='notifisFollows'
						className='!overflow-y-scroll h-full space-y-4 pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(5.9375rem+var(--safe-area-inset-bottom))]'
					>
						<InfiniteScroll
							hasMore={subscribers.length < Number(counts[1])}
							dataLength={subscribers.length}
							next={() => addPage(prev => prev + 1)}
							scrollableTarget='notifisFollows'
							className='space-y-4'
						>
							{!notificationsError &&
								subscribers.map(notification => <FollowBlock key={notification.id} notification={notification} token={token} />)}
							{notificationsLoading &&
								Array.from({ length: 10 }, (_, i) => i).map(index => <Skeleton key={index} className='w-full rounded-lg min-h-24' />)}
							{!notificationsLoading && subscribers.length === 0 && (
								<NoContent
									title='No notifications here yet'
									primary="maybe they'll be here soon"
									className='h-full animate-[fadeIn_0.3s_ease-out]'
									image='nothing.png'
								/>
							)}
						</InfiniteScroll>
					</SwiperSlide>
					<SwiperSlide
						id='notifisComments'
						className='!overflow-y-scroll h-full space-y-4 pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(5.9375rem+var(--safe-area-inset-bottom))]'
					>
						<InfiniteScroll
							hasMore={comments.length < Number(counts[2])}
							dataLength={comments.length}
							next={() => addPage(prev => prev + 1)}
							scrollableTarget='notifisComments'
							className='space-y-4'
						>
							{!notificationsError && comments.map(notification => <CommentBlock key={notification.id} notification={notification} token={token} />)}
							{notificationsLoading &&
								Array.from({ length: 10 }, (_, i) => i).map(index => <Skeleton key={index} className='w-full rounded-lg min-h-[5.75rem]' />)}
							{!notificationsLoading && comments.length === 0 && (
								<NoContent
									title='No notifications here yet'
									primary="maybe they'll be here soon"
									className='h-full animate-[fadeIn_0.3s_ease-out]'
									image='nothing.png'
								/>
							)}
						</InfiniteScroll>
					</SwiperSlide>
				</Swiper>
			</div>
			<SwitcherBar active={active} setActive={setActive} />
		</PageModal>
	);
}
