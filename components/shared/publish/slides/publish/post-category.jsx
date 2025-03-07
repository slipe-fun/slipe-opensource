import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import categoriesPublish from "@/constants/categories-publish";

import "swiper/css";
import "swiper/css/effect-creative";
import { useEffect, useState } from "react";

export default function PublishPostCategory({ blockVariants, category, setCategory, setCategoryFocused, categoryFocused }) {
	const [active, setActive] = useState(0);

	useEffect(() => {
		setCategory(categoriesPublish[active].name)
	}, [active])

	return (
		<motion.div
			transition={{ type: "spring" }}
			key='postCategory-container'
			variants={blockVariants}
			animate={{
				background: `linear-gradient(to bottom, ${categoriesPublish[active].gradient})`,
				...blockVariants.visible,
			}}
			whileTap={{ scale: 0.99, opacity: 0.8, transition: { delay: 0.1 } }}
			className='relative w-full h-[9.25rem] flex gap-5 rounded-[1.25rem] bg-gradient-to-b from-[#FFAD66] to-[#FF9233] overflow-hidden'
		>
			<div className='w-full h-full flex flex-col p-5 relative justify-between'>
				<span className='text-white/50 font-semibold'>Post category</span>
				<AnimatePresence>
					<motion.span
						initial={{ opacity: 0, y: -12, scale: 0.8 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.35, type: "spring" }}
						exit={{ opacity: 0, y: 12, scale: 0.8 }}
						className='text-white font-semibold absolute bottom-5 text-2xl'
						key={active}
					>
						{category}
					</motion.span>
				</AnimatePresence>
			</div>
			<Swiper
				direction='vertical'
				onActiveIndexChange={slider => setActive(slider.activeIndex)}
				creativeEffect={{
					limitProgress: 2,
					prev: {
						opacity: 0.5,
						scale: 0.75,
						translate: [0, "-62%", 0],
					},
					next: {
						opacity: 0.5,
						scale: 0.75,
						translate: [0, "62%", 0],
					},
				}}
				effect='creative'
				className='min-w-[7rem] pr-5 h-full'
				slidesPerView={1}
				modules={[EffectCreative]}
			>
				{categoriesPublish.map((category, index) => (
					<SwiperSlide className='w-full justify-center flex items-center'>
						<img className={`aspect-square w-[5rem] min-w-[5rem]`} src={`./static/publish-assets/categories/${category.emoji}.png`} />
					</SwiperSlide>
				))}
			</Swiper>
		</motion.div>
	);
}
