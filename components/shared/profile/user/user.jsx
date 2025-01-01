import { Button } from "@/components/ui/button";
import cdn from "@/constants/cdn";
import { motion, useTransform } from "framer-motion";
import PixelAvatar from "../../pixels-avatar";
import { useEffect, useState } from "react";
import { AvatarModal } from "../profile";
import FollowersModal from "../../modals/followers/followers";

export default function User({ user = {}, scrollProgress }) {
	const invertInteger = (num, center = 0.5) => center * 2 - num;
	const scale = useTransform(scrollProgress, value => invertInteger(value * 0.001));
	const opacity = useTransform(scrollProgress, value => invertInteger(value * 0.008));
	const covering = useTransform(scrollProgress, value => value >= 160);
	const [isCovering, setIsCovering] = useState(covering.get());
	const [isAvatar, setIsAvatar] = useState(false);

	useEffect(() => {
		const unsubscribe = covering.on("change", setIsCovering);
		return () => unsubscribe();
	}, [covering]);

	return (
		<motion.div data-covering={isCovering} className='w-full data-[covering=true]:z-10 flex flex-col -mb-16 z-40 -translate-y-16 gap-1 px-5'>
			<div className='flex justify-between items-end'>
				{user.avatar ? (
					<motion.img
						data-covering={isCovering}
						onClick={() => setIsAvatar(prev => !prev)}
						style={{ scale, opacity }}
						className='rounded-full z-40 data-[covering=true]:pointer-events-none w-32 aspect-square border-[6px] border-background object-cover'
						src={`${cdn}/avatars/${user.avatar}`}
						id='profile-avatar'
					/>
				) : (
					<PixelAvatar
						data-covering={isCovering}
						onClick={() => setIsAvatar(prev => !prev)}
						style={{ scale, opacity, "--size": "128px" }}
						animated
						size={128}
						username={user.username}
						className='border-[6px] data-[covering=true]:pointer-events-none border-background'
						pixels={user.pixel_order}
					/>
				)}
				<FollowersModal user={{ username: "sigma"}}>
					<div className='h-1/2 flex items-center active:opacity-80 duration-200 ease-out'>
						<p className='text-lg font-medium'>
							<span>{user.subscribers || 0}</span> <span className='text-foreground/50'>Followers</span>
						</p>
					</div>
				</FollowersModal>
			</div>
			<div className='flex items-center gap-5'>
				<div className='flex flex-col w-full overflow-hidden'>
					<div className='whitespace-nowrap max-w-fit text-2xl text-ellipsis font-medium'>{user.nickname || user.username || "Anonymous"}</div>
					<span className='text-foreground/50 w-full text-lg'>@{user.username || "unknown"}</span>
				</div>
				<Button className='rounded-full px-7 min-h-[3.25rem] text-lg h-[3.25rem]'>Edit bio</Button>
			</div>
			<AvatarModal user={user} open={isAvatar} setOpen={setIsAvatar} />
		</motion.div>
	);
}
