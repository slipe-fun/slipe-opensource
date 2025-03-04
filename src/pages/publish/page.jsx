import Header from "@/components/shared/publish/header";
import Choose from "@/components/shared/publish/slides/choose";
import ToolsBar from "@/components/shared/publish/tools-bar";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useCallback } from "react";
import { EffectCreative } from "swiper/modules";
import Editor from "@/components/shared/publish/slides/editor";

import "swiper/css";
import "swiper/css/effect-creative";

export default function Publish() {
	const [swiper, setSwiper] = useState(null);
	const [active, setActive] = useState(0);
	const [image, setImage] = useState(null);
	const [chooseConfrim, setChooseConfirm] = useState(false);

	useEffect(() => {
		swiper?.slideTo(active);
	}, [active, swiper]);

	const discardChanges = useCallback(() => {
		setImage(null)
		setChooseConfirm(false)
		setActive(0)
	}, [setImage, setChooseConfirm, setActive])

	useEffect(() => {
		if (image) {
			setActive(1);
		}
	}, [image]);

	return (
		<>
			<Header setSlide={setActive} confirmed={chooseConfrim} discardChanges={discardChanges} slide={active} />
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
				className='w-full h-full px-4'
				slidesPerView={1}
				modules={[EffectCreative]}
			>
				<SwiperSlide className='h-full flex gap-4 flex-col pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(6.1875rem+var(--safe-area-inset-bottom))]'>
					<Choose hidden={active !== 0} output={setImage} />
				</SwiperSlide>
				<SwiperSlide className='h-full flex gap-4 flex-col pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(6.1875rem+var(--safe-area-inset-bottom))]'>
					<Editor hidden={active !== 1} confirmed={chooseConfrim} image={image} />
				</SwiperSlide>
				<SwiperSlide className='h-full flex gap-4 flex-col pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(6.1875rem+var(--safe-area-inset-bottom))]'>
					<Choose />
				</SwiperSlide>
			</Swiper>
			<ToolsBar confirmed={chooseConfrim} setConfirmed={setChooseConfirm} setSlide={setActive} setImage={setImage} slide={active} />
		</>
	);
}
