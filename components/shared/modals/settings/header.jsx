import cdn from "@/constants/cdn";
import { ShufflePixels, PixelsColors } from "@/lib/utils";
import { motion, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

export default function Header({ user = {}, scrollProgress, setOpen }) {
	const width = useTransform(scrollProgress, [0, 140], [140, 0]);
	const opacity = useTransform(scrollProgress, [0, 140], [1, 0]);
	const fontSize = useTransform(scrollProgress, [0, 140], ["24px", "18px"]);
	const gap = useTransform(scrollProgress, [0, 140], ["8px", "0px"]);
	const lineHeight = useTransform(scrollProgress, [0, 140], ["32px", "28px"]);
	const fontSize1 = useTransform(scrollProgress, [0, 140], ["18px", "16px"]);
	const lineHeight1 = useTransform(scrollProgress, [0, 140], ["28px", "24px"]);
	const padding = useTransform(scrollProgress, [0, 140], ["20px", "16px"]);
	const height = useTransform(scrollProgress, [0, 140], [60, 56]);

	return (
		<div className='top-0 w-full overflow-hidden fixed h-fit min-h-fit z-30 rounded-b-[1.25rem]'>
			{user?.banner ? (
				<img loading='lazy' src={cdn + "/banners/" + user?.banner} className='w-full absolute -z-10 h-full object-cover' />
			) : (
				<div className='grid grid-cols-7 bg-black grid-rows-1 absolute -z-10 h-full w-full'>
					{ShufflePixels(user?.pixel_order)?.map((pixel, index) => (
						<span key={index} style={{ background: `${PixelsColors[user?.username[0]]}`, opacity: 0.25 * pixel }} className='w-full aspect-square' />
					))}
				</div>
			)}
			<div className='w-full absolute flex justify-between p-4'>
				<Button onClick={() => setOpen(false)} className='rounded-full hover:bg-black/35 bg-black/35 backdrop-blur-2xl' size='icon'>
					<Svg icon={icons["chevronLeft"]} className='duration-200 ease-out !w-7 !h-7' />
				</Button>
				<Button
					size='icon'
					data-isactive={false}
					className='rounded-full data-[isactive=false]:bg-black/35 backdrop-blur-2xl data-[isactive=true]:bg-white data-[isactive=false]:text-white data-[isactive=true]:text-black'
				>
					<Svg className='!w-[1.625rem] !h-[1.625rem]' icon={icons["pencil"]} />
				</Button>
			</div>
			<motion.div style={{ gap, padding }} className='w-full flex flex-col gap-2 p-5 justify-center bg-black/50 items-center'>
				{user.avatar ? (
					<motion.img
						style={{ width, opacity }}
						className='rounded-full z-40 origin-top data-[covering=true]:pointer-events-none w-[8.75rem] aspect-square border-background object-cover'
						src={`${cdn}/avatars/${user.avatar}`}
						id='profile-avatar'
					/>
				) : (
					<PixelAvatar
						style={{ width, opacity, "--size": "140px" }}
						animated
						size={128}
						username={user.username}
						className='border-[6px] origin-top data-[covering=true]:pointer-events-none border-background'
						pixels={user.pixel_order}
					/>
				)}
				<motion.div style={{ height }} className='flex flex-col justify-center items-center w-full overflow-hidden'>
					<motion.span
						style={{ fontSize, lineHeight }}
						className='whitespace-nowrap text-white block max-w-fit text-2xl text-ellipsis font-medium overflow-hidden'
					>
						{user.nickname || user.username || "Anonymous"}
					</motion.span>
					<motion.span style={{ fontSize: fontSize1, lineHeight: lineHeight1 }} className='text-white/50 text-lg'>
						{user.email || `@${user.username}`}
					</motion.span>
				</motion.div>
			</motion.div>
		</div>
	);
}
