import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, FreeMode } from "swiper/modules";
import { useState, useEffect } from "react";
import { Reactions, Comments, Posts } from "../profile";
import { useStorage } from "@/hooks/contexts/session";

import "swiper/css";
import "swiper/css/effect-creative";

export default function Publications({ user, isModal }) {
	const [swiper, setSwiper] = useState(null);
	const [active, setActive] = useState(0);
	const { token, storage } = useStorage();

	useEffect(() => {
		swiper?.slideTo(active);
		document.getElementById(isModal ? "content-switcher-modal" : "content-switcher")?.scrollTo({
			left: document.getElementById(isModal ? `switcher-modal-button-${active}` : `switcher-button-${active}`).offsetLeft - 20,
			behavior: "smooth",
			block: "start",
		});
	}, [active]);

	return (
		<div className='flex flex-col gap-5'>
			<div id={isModal ? "content-switcher-modal" : "content-switcher"} className='flex gap-6 font-medium text-2xl px-5 overflow-x-auto'>
				<button
					onClick={() => setActive(0)}
					id={isModal ? "switcher-modal-button-0" : "switcher-button-0"}
					data-active={active === 0}
					className='duration-200 ease-out data-[active=true]:opacity-100 opacity-50'
				>
					Publications
				</button>
				{isModal ? (
					<button
						onClick={() => setActive(1)}
						id={isModal ? "switcher-modal-button-1" : "switcher-button-1"}
						data-active={active === 1}
						className='duration-200 ease-out data-[active=true]:opacity-100 opacity-50'
					>
						Similar users
					</button>
				) : (
					<>
						<button
							onClick={() => setActive(1)}
							id={isModal ? "switcher-modal-button-1" : "switcher-button-1"}
							data-active={active === 1}
							className='duration-200 ease-out data-[active=true]:opacity-100 opacity-50'
						>
							Comments
						</button>
						<button
							onClick={() => setActive(2)}
							id={isModal ? "switcher-modal-button-2" : "switcher-button-2"}
							data-active={active === 2}
							className='duration-200 ease-out data-[active=true]:opacity-100 opacity-50'
						>
							Reactions
						</button>
					</>
				)}
			</div>
			<Swiper
				onSwiper={setSwiper}
				resistance={true}
				autoHeight
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
					<Posts isModal={isModal} user={user} token={token} />
				</SwiperSlide>
				{isModal ? (
					<SwiperSlide>{/*Similar users slide here*/}</SwiperSlide>
				) : (
					<>
						<SwiperSlide>
							<Comments user={user} token={token} />
						</SwiperSlide>
						<SwiperSlide>
							<Reactions token={token} />
						</SwiperSlide>
					</>
				)}
			</Swiper>
		</div>
	);
}
