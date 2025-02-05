import { Button } from "@/components/ui/button";
import cdn from "@/constants/cdn";
import { motion, useTransform } from "framer-motion";
import PixelAvatar from "../../pixels-avatar";
import { useEffect, useState } from "react";
import { AvatarModal } from "../profile";
import { FollowersModal } from "../../modals";
import { useStorage } from "@/hooks/contexts/session";
import follow from "@/lib/users/follow";
import Img from "@/components/ui/image";

export default function User({ user = {}, scrollProgress, subscribe, isModal }) {
	const invertInteger = (num, center = 0.5) => center * 2 - num;
	const scale = useTransform(scrollProgress, value => invertInteger(value * 0.001));
	const opacity = useTransform(scrollProgress, value => invertInteger(value * 0.008));
	const covering = useTransform(scrollProgress, value => value >= 150);
	const [isCovering, setIsCovering] = useState(covering.get());
	const [isAvatar, setIsAvatar] = useState(false);
	const [isFollowers, setIsFollowers] = useState(false);
	const [dateId, setDateId] = useState(0);
	const { token, store } = useStorage();
	const [isSubscribed, setIsSubscribed] = useState(false);

	async function subscribeUser() {
		if (subscribe) return subscribe();

		const currentStatus = isSubscribed;
		setIsSubscribed(!currentStatus);

		const followRequest = await follow(user?.id, token);

		if (followRequest?.error) {
			setIsSubscribed(currentStatus);
		}
	}

	useEffect(() => setDateId(new Date().getTime()), []);

	useEffect(() => {
		const unsubscribe = covering.on("change", setIsCovering);
		return () => unsubscribe();
	}, [covering]);
	useEffect(() => setIsSubscribed(user?.subscribed), [user]);

	return (
		<motion.div data-covering={isCovering} className='w-full data-[covering=true]:z-10 flex flex-col -mb-16 z-40 -translate-y-16 gap-1 px-4'>
			<div className='flex justify-between items-end'>
				{user.avatar ? (
					<motion.div
						id='profile-avatar'
						data-covering={isCovering}
						onClick={() => setIsAvatar(prev => !prev)}
						style={{ scale, opacity }}
						className='rounded-full z-40 data-[covering=true]:pointer-events-none w-[7.5rem] bg-background aspect-square border-[5px] border-background'
					>
						<Img wrapper={false} src={`${cdn}/avatars/${user.avatar}`} className='object-cover rounded-full' />
					</motion.div>
				) : (
					<PixelAvatar
						data-covering={isCovering}
						onClick={() => setIsAvatar(prev => !prev)}
						style={{ scale, opacity, "--size": "120px" }}
						animated
						size={128}
						username={user.username}
						className='border-[5px] data-[covering=true]:pointer-events-none bg-background border-background'
						pixels={user.pixel_order}
					/>
				)}
				<FollowersModal
					user={user}
					open={isFollowers}
					setOpen={setIsFollowers}
					scrollableTarget={isModal ? `followersScrollModal-${dateId}` : "followersScroll"}
				>
					<div className='h-14 flex items-center active:opacity-80 duration-200 ease-out'>
						<p className='font-medium text-lg'>
							<span>{user.subscribers || 0}</span> <span className='text-foreground/50'>Followers</span>
						</p>
					</div>
				</FollowersModal>
			</div>
			<div className='flex items-center gap-4'>
				<div className='flex flex-col w-full overflow-hidden'>
					<div className='whitespace-nowrap max-w-fit text-[1.375rem] leading-7 text-ellipsis font-medium overflow-hidden'>
						{user.nickname || user.username || "Anonymous"}
					</div>
					<span className='text-foreground/50 w-full'>@{user.username || "unknown"}</span>
				</div>
				{isModal ? (
					<Button
						onClick={subscribeUser}
						data-subscribed={isSubscribed}
						className='data-[subscribed=true]:!bg-foreground/[0.12] text-lg rounded-full px-6 min-h-[3.25rem] h-[3.25rem]'
					>
						{isSubscribed ? "Unfollow" : "Follow"}
					</Button>
				) : (
					<Button className='rounded-full text-lg px-6 min-h-[3.25rem] h-[3.25rem]'>Edit bio</Button>
				)}
			</div>
			<AvatarModal isModal={isModal} user={user} open={isAvatar} setOpen={setIsAvatar} />
		</motion.div>
	);
}
