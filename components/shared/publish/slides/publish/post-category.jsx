import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";

export default function PublishPostCategory({ blockVariants, category, setCategory }) {
	return (
		<motion.div
			transition={{ type: "spring" }}
			key='postCategory-container'
			variants={blockVariants}
			whileTap={{ scale: 0.99, opacity: 0.8 }}
			className='relative w-full h-[9.25rem] flex gap-5 rounded-[1.25rem] bg-gradient-to-b from-[#FFAD66] to-[#FF9233] overflow-hidden'
		>
			<div className='w-full h-full flex flex-col p-5 justify-between'>
				<span className='text-white/50 font-semibold'>Post category</span>
				<span className='text-white font-semibold text-2xl'>{category}</span>
			</div>
			<Swiper
				direction='vertical'
                loop
				onActiveIndexChange={slider => console.log(slider.activeIndex)}
				creativeEffect={{
					limitProgress: 2,
					prev: {
						opacity: 0.5,
                        scale: 0.8,
						translate: [0, "-59%", 0],
					},
					next: {
						opacity: 0.5,
                        scale: 0.8,
						translate: [0, "59%", 0],
					},
				}}
				effect='creative'
				className='min-w-[7rem] h-full'
				slidesPerView={1}
				modules={[EffectCreative]}
			>
                <SwiperSlide className="w-full justify-center flex items-center">
					<img className={`aspect-square w-[5rem] min-w-[5rem]`} src='./static/publish-assets/reactions.png' />
				</SwiperSlide>
                <SwiperSlide className="w-full justify-center flex items-center">
					<img className={`aspect-square w-[5rem] min-w-[5rem]`} src='./static/publish-assets/reactions.png' />
				</SwiperSlide>
                <SwiperSlide className="w-full justify-center flex items-center">
					<img className={`aspect-square w-[5rem] min-w-[5rem]`} src='./static/publish-assets/reactions.png' />
				</SwiperSlide>
                <SwiperSlide className="w-full justify-center flex items-center">
					<img className={`aspect-square w-[5rem] min-w-[5rem]`} src='./static/publish-assets/reactions.png' />
				</SwiperSlide>
                <SwiperSlide className="w-full justify-center flex items-center">
					<img className={`aspect-square w-[5rem] min-w-[5rem]`} src='./static/publish-assets/reactions.png' />
				</SwiperSlide>
                <SwiperSlide className="w-full justify-center flex items-center">
					<img className={`aspect-square w-[5rem] min-w-[5rem]`} src='./static/publish-assets/reactions.png' />
				</SwiperSlide>
                <SwiperSlide className="w-full justify-center flex items-center">
					<img className={`aspect-square w-[5rem] min-w-[5rem]`} src='./static/publish-assets/reactions.png' />
				</SwiperSlide>
                <SwiperSlide className="w-full justify-center flex items-center">
					<img className={`aspect-square w-[5rem] min-w-[5rem]`} src='./static/publish-assets/reactions.png' />
				</SwiperSlide>
                <SwiperSlide className="w-full justify-center flex items-center">
					<img className={`aspect-square w-[5rem] min-w-[5rem]`} src='./static/publish-assets/reactions.png' />
				</SwiperSlide>
			</Swiper>
		</motion.div>
	);
}
