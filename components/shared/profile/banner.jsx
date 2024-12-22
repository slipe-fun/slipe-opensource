import cdn from "@/constants/cdn";
import { ShufflePixels, PixelsColors } from "@/lib/utils";
import { motion, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Banner({ user = {}, scrollProgress }) {
	const invertInteger = (num, center = 0.5) => center * 2 - num;
	const opacity = useTransform(scrollProgress, value => value * 0.01);
	const bannerRef = useRef(null);
	const bannerSize = bannerRef.current?.getBoundingClientRect()?.height
	const height = useTransform(scrollProgress, [0, 180], [bannerSize, 88])

	return (
		<>
			<div ref={bannerRef} style={{ "--top-sticking": `${bannerSize - 88}px` }} className='sticky -top-[--top-sticking] w-full overflow-hidden aspect-[16/11] min-h-fit z-30 rounded-b-[1.25rem]'>
				{user?.banner ? (
					<img loading='lazy' src={cdn + "/banners/" + user?.banner} className='w-full absolute -z-10 h-full object-cover' />
				) : (
					<div className='grid grid-cols-7 grid-rows-1 absolute -z-10 h-full w-full'>
						{ShufflePixels(user?.pixel_order)?.map((pixel, index) => (
							<span
								key={index}
								style={{ background: `${PixelsColors[user?.username[0]]}`, opacity: 0.25 * pixel }}
								className='w-full aspect-square'
							/>
						))}
					</div>
				)}
				<motion.span style={{ opacity: invertInteger(opacity) }} className='w-full h-full bg-gradient-to-b from-[#00000040] to-50% to-[#00000000] block' />
				<motion.div style={{ opacity, height }} className="bottom-0 w-full flex items-center p-5 justify-center text-white flex-col absolute bg-black/50">
				<span className="font-medium text-xl">{user?.nickname}</span>
				<span className="opacity-50">@{user?.username}</span>
				</motion.div>
			</div>
		</>
	);
}
