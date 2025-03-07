import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import { Button } from "@/components/ui/button";
import categoriesPublish from "@/constants/categories-publish";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import "swiper/css";
import "swiper/css/effect-creative";

export default function PublishPostCategory({ blockVariants, category, setCategory, setCategoryFocused, categoryFocused, setActive, active }) {
	const [swiper, setSwiper] = useState(null);

	useEffect(() => {
		setCategory(categoriesPublish[active].name);
		swiper?.slideTo(active);
	}, [active]);

	return (
		<motion.div
			transition={{ type: "spring" }}
			key='postCategory-container'
			onClick={() => setCategoryFocused(prev => !prev)}
			variants={blockVariants}
			animate={{
				background: `linear-gradient(to bottom, ${categoriesPublish[active].gradient})`,
				...blockVariants.visible,
			}}
			whileTap={{ scale: 0.99, opacity: 0.8, transition: { delay: 0.1 } }}
			className={`relative w-full h-[9.25rem] flex gap-5 pr-5 rounded-[1.25rem] duration-300 ease-out ${
				categoryFocused ? "z-[20] !-translate-y-[10.25rem]" : ""
			} overflow-hidden`}
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
				onSwiper={setSwiper}
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
				className='min-w-[7rem]  h-full'
				slidesPerView={1}
				modules={[EffectCreative]}
			>
				{categoriesPublish.map((category, index) => (
					<SwiperSlide className='w-full justify-center flex items-center' key={index}>
						<img className={`aspect-square w-[5rem] min-w-[5rem]`} src={`./static/publish-assets/categories/${category.emoji}.png`} />
					</SwiperSlide>
				))}
			</Swiper>
		</motion.div>
	);
}

export function PostCategorySelector({ active, setActive }) {
	return (
		<>
			{categoriesPublish.map((categoryList, index) => (
				<motion.li key={index} whileTap={{ scale: 0.99, opacity: 0.8 }} className='w-full'>
					<Button
						data-active={active === index}
						onClick={() => setActive(index)}
						size='full'
						className='p-4 py-4 gap-[0.875rem] hover:bg-inherit active: data-[active=true]:!bg-foreground/[0.16] rounded-2xl bg-transparent h-auto'
						variant='secondary'
					>
						<img className={`aspect-square w-[2.125rem] min-w-[2.125rem]`} src={`./static/publish-assets/categories/${categoryList.emoji}.png`} />
						<span className='w-full text-start'>{categoryList.name}</span>
						<Checkbox checked={active === index} />
					</Button>
				</motion.li>
			))}
		</>
	);
}
