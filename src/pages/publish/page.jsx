import Header from "@/components/shared/publish/header";
import Choose from "@/components/shared/publish/slides/choose";
import ToolsBar from "@/components/shared/publish/tools-bar";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";

export default function Publish() {
	const [swiper, setSwiper] = useState(null);
	const [active, setActive] = useState(0);

	useEffect(() => {
		swiper?.slideTo(active);
	}, [active, swiper]);

	return (
		<>
			<Header slide={active} />
			<Swiper
				onSwiper={setSwiper}
				allowTouchMove={false}
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
				className='w-full h-full px-4 pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(6rem+var(--safe-area-inset-bottom))]'
				slidesPerView={1}
				modules={[EffectCreative]}
			>
				<SwiperSlide className='h-full flex gap-4 flex-col'>
					<Choose />
				</SwiperSlide>
				<SwiperSlide className='h-full flex gap-4 flex-col'>
					<Choose />
				</SwiperSlide>
				<SwiperSlide className='h-full flex gap-4 flex-col'>
					<Choose />
				</SwiperSlide>
			</Swiper>
			<ToolsBar slide={active} />
		</>
	);
}
