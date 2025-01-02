import cdn from "@/constants/cdn";
import { ShufflePixels, PixelsColors } from "@/lib/utils";
import { motion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Banner({ user = {}, scrollProgress }) {
	const invertInteger = (num, center = 0.5) => center * 2 - num;
	const opacity = useTransform(scrollProgress, value => value * 0.01);
	const bannerRef = useRef(null);
	const [bannerSize, setBannerSize] = useState(0);
	const height = useTransform(scrollProgress, [0, 180], [bannerSize, 88]);

	useEffect(() => {
		setTimeout(() => {
			setBannerSize(bannerRef.current?.getBoundingClientRect()?.height);
		}, 300);
	}, []);

	return (
		<>
			<div
				ref={bannerRef}
				style={{ "--top-sticking": `${bannerSize <= 0 ? bannerSize : bannerSize - 88}px` }}
				className='sticky -top-[--top-sticking] w-full overflow-hidden aspect-[16/11] min-h-fit z-30 rounded-b-[1.25rem]'
			>
				{user?.banner ? (
					<img loading='lazy' src={cdn + "/banners/" + user?.banner} className='w-full absolute -z-10 h-full object-cover' />
				) : (
					<div className='grid grid-cols-7 bg-black grid-rows-1 absolute -z-10 h-full w-full'>
						{ShufflePixels(user?.pixel_order)?.map((pixel, index) => (
							<span
								key={index}
								style={{ background: `${PixelsColors[user?.username[0]]}`, opacity: 0.25 * pixel }}
								className='w-full aspect-square'
							/>
						))}
					</div>
				)}
				<motion.span
					style={{ opacity: invertInteger(opacity) }}
					className='w-full h-full bg-gradient-to-b from-[#00000040] to-50% to-[#00000000] block'
				/>
				<motion.div
					style={{ opacity, height }}
					className='bottom-0 w-full flex items-center p-5 justify-center pointer-events-none text-white flex-col absolute bg-black/50'
				>
					<span className='font-medium text-lg overflow-hidden w-full whitespace-nowrap max-w-fit text-ellipsis text-center'>
						{user?.nickname ? user?.nickname : user?.username}
					</span>
					<span className='opacity-50 overflow-hidden w-full whitespace-nowrap max-w-fit text-ellipsis text-center'>@{user?.username}</span>
				</motion.div>
			</div>
		</>
	);
}
