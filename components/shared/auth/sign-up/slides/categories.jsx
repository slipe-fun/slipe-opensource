import SlideTemplate from "../slide-template";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, EffectCreative } from "swiper/modules";
import categories from "@/constants/categories";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export default function CategoriesSlide({ categoriesPack, setCategoriesPack }) {
	const gradients = [
		["#545764", "#838383"],
		["#0070F3", "#44BCEF"],
		["#FF4B41", "#FF6F1E"],
		["#0BA360", "#3CBA92"],
	];

	return (
		<>
			<div className='flex flex-col gap-5 items-center'>
				<SlideTemplate title='Choose categories' img='/static/auth-assets/globe.png' />
				<Swiper
					slidesPerView={1.225}
					centeredSlides
					creativeEffect={{
						limitProgress: 4,
						prev: {
							opacity: 0.5,
							translate: ["-107%", 0, 0],
						},
						next: {
							opacity: 0.5,
							translate: ["107%", 0, 0],
						},
					}}
					pagination={{
						clickable: true,
					}}
					effect='creative'
					autoHeight
					modules={[Pagination, EffectCreative]}
					className='w-full !flex flex-col gap-2'
				>
					{categories.map((categories, index) => (
						<SwiperSlide key={index} className='!grid grid-cols-2 rounded-3xl aspect-square grid-rows-2 gap-3'>
							{categories.map(category => (
								<div
									style={{ "--start-gradient": gradients[index][0], "--end-gradient": gradients[index][1] }}
									className='bg-gradient-to-br from-[--start-gradient] font-medium to-[--end-gradient] flex justify-center text-lg items-center flex-col gap-2 rounded-xl w-full h-full'
								>
									<img loading="lazy" src={`/emojis/new/${category.emoji}`} alt={category.emoji} className='w-16 object-cover bg-center h-16' />
									{category.name}
								</div>
							))}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
}
