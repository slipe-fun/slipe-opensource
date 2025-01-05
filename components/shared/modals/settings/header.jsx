import cdn from "@/constants/cdn";
import { ShufflePixels, PixelsColors } from "@/lib/utils";
import { motion, useTransform } from "framer-motion";

export default function Header({ user = {}, scrollProgress }) {
	// const invertInteger = (num, center = 0.5) => center * 2 - num;
	// const avatarScale = useTransform(scrollProgress, [0, 1], [1, 0]);

	return (
		<>
			<div
				className='fixed top-0 w-full overflow-hidden h-fit min-h-fit z-30 rounded-b-[1.25rem]'
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
			</div>
		</>
	);
}
