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

export default function NotificationsModal({ open, setOpen }) {
	const [swiper, setSwiper] = useState(null);
	const [active, setActive] = useState(0);

	useEffect(() => {
		swiper?.slideTo(active);
	}, [active]);

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
						<ReactionBlock />
						<ReactionBlock />
						<ReactionBlock />
						<ReactionBlock />
					</SwiperSlide>
					<SwiperSlide className='overflow-y-scroll space-y-4'>
						<FollowBlock />
						<FollowBlock />
						<FollowBlock />
						<FollowBlock />
					</SwiperSlide>
					<SwiperSlide className='overflow-y-scroll space-y-4'>
						<ReactionBlock />
						<ReactionBlock />
						<ReactionBlock />
						<ReactionBlock />
					</SwiperSlide>
				</Swiper>
			</div>
			<SwitcherBar active={active} setActive={setActive} />
		</PageModal>
	);
}
