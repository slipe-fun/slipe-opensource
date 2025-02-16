import { PageModal } from "../../modals";
import Header from "./header";
import SwitcherBar from "./switcher-bar";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import ReactionBlock from "./blocks/reaction";

import "swiper/css";
import "swiper/css/effect-creative";
import FollowBlock from "./blocks/follow";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";
import { fetcher, GetUniqueById } from "@/lib/utils";

export default function NotificationsModal({ open, setOpen }) {
	const [swiper, setSwiper] = useState(null);
	const [active, setActive] = useState(0);

	const [reactions, setReactions] = useState([]);
	const [subscribers, setSubscribers] = useState([]);
	const [comments, setComments] = useState([]);
	const [pages, setPages] = useState([1, 1, 1]);
	const { token, store } = useStorage();

	const types = ["reaction", "subscribe", "comment"];
	const url = `${api.v1}/notifications/get?page=${pages[active]}&type=${types[active]}`

	const {
		data: notificationsRequest,
		error: notificationsError,
		isLoading: notificationsLoading
	} = useCacheFetcher(url, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	useEffect(() => { swiper?.slideTo(active) }, [active])

	useEffect(() => {
		if (!notificationsError && !notificationsLoading) {
			const notificationType = notificationsRequest?.success[0]?.type || types[active];

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

	return (
		<PageModal open={open}>
			<Header setOpen={setOpen} />
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
					className='w-full h-full px-4 pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(5.9375rem+var(--safe-area-inset-bottom))]'
					slidesPerView={1}
					modules={[EffectCreative]}
				>
					<SwiperSlide className='overflow-y-scroll space-y-4'>
						{!notificationsError ? reactions.map(notification => <ReactionBlock notification={notification} />) : null}
					</SwiperSlide>
					<SwiperSlide className='overflow-y-scroll space-y-4'>
						{!notificationsError ? subscribers.map(notification => <FollowBlock notification={notification} />) : null}
					</SwiperSlide>
					<SwiperSlide className='overflow-y-scroll space-y-4'>
						{!notificationsError ? reactions.map(notification => <ReactionBlock notification={notification} />) : null}
					</SwiperSlide>
				</Swiper>
			</div>
			<SwitcherBar active={active} setActive={setActive} />
		</PageModal>
	);
}
