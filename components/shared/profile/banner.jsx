import cdn from "@/constants/cdn";
import { ShufflePixels, PixelsColors } from "@/lib/utils";
import { motion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Img from "@/components/ui/image";

export default function Banner({ user = {}, scrollProgress }) {
	const invertInteger = (num, center = 0.5) => center * 2 - num;
	const [insetVar, setInsetVar] = useState(0);
	const opacity = useTransform(scrollProgress, value => value * 0.01);
	const bannerRef = useRef(null);
	const [bannerSize, setBannerSize] = useState(0);
	const height = useTransform(scrollProgress, [0, bannerSize <= 0 ? bannerSize : bannerSize - 84 - insetVar], [bannerSize, 84 + insetVar]);

	useEffect(() => {
		const insetValue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-top").trim());
		setInsetVar(insetValue);

		const observer = new ResizeObserver(([entry]) => {
			setBannerSize(entry.contentRect.height);
			console.log(entry, entry.contentRect, bannerSize)
		});

		if (bannerRef.current) observer.observe(bannerRef.current);

		return () => {
			if (bannerRef.current) observer.unobserve(bannerRef.current);
		};
	}, []);

	return (
		<>
			<div
				ref={bannerRef}
				style={{ "--top-sticking": `${bannerSize <= 0 ? 0 : bannerSize - 84 - insetVar}px` }}
				className='sticky -top-[--top-sticking] w-full overflow-hidden aspect-[16/10] z-30 rounded-b-2xl'
			>
				{user?.banner ? (
					<Img src={cdn + "/banners/" + user?.banner} wrapperClassName="w-full aspect-[16/10] -z-10" className="object-cover"/>
				) : (
					<div className='grid grid-cols-7 bg-black grid-rows-1 -z-10 aspect-[16/10] w-full'>
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
					className='w-full h-full bg-gradient-to-b from-[#00000040] absolute to-50% to-[#00000000] block'
				/>
				<motion.div
					style={{ opacity, height }}
					className='bottom-0 w-full flex items-center p-4 pt-[calc(1rem+var(--safe-area-inset-top))] justify-center pointer-events-none text-white flex-col absolute bg-black/50'
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
