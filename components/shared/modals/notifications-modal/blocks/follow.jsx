import Img from "@/components/ui/image";
import PixelAvatar from "@/components/shared/pixels-avatar";
import cdn from "@/constants/cdn";
import { Button } from "@/components/ui/button";
import { TimePassedFromDate } from "@/lib/utils";
import follow from "@/lib/users/follow";
import { UserModal } from "@/components/shared/modals";
import { useState } from "react";

export default function FollowBlock({ notification, token }) {
	const [user, setUser] = useState(notification?.from_user);
	const [open, setOpen] = useState(false);

	async function Follow() {
		setUser({ ...user, subscribed: !user?.subscribed });

		const request = await follow(user?.id, token);

		if (request?.error) setUser({ ...user, subscribed: !user?.subscribed });
	}

	return (
		<>
			<div className='w-full border border-foreground/[0.1] bg-block rounded-lg flex p-3 flex-col gap-[0.125rem]'>
				<div className='w-full flex items-center gap-4'>
					<div onClick={() => (user ? setOpen(true) : null)} className='w-full flex gap-3 duration-200 ease-out items-center overflow-hidden active:opacity-80'>
						{user?.avatar ? (
							<Img wrapperClassName='rounded-full min-w-11 h-11' iconClassName='!w-7 !h-7' src={`${cdn}/avatars/${user?.avatar}`} />
						) : (
							<PixelAvatar size={44} username={user?.username || "Anonymous"} pixels={user?.pixel_order || Array.from({ length: 16 }, () => Math.floor(Math.random() * 5))} />
						)}
						<div className='flex flex-col w-full overflow-hidden'>
							<div className='w-full flex gap-1'>
								<div className='whitespace-nowrap overflow-hidden text-sm max-w-fit text-ellipsis font-medium text-foreground'>
									{user?.nickname || user?.username || "Anonymous"}
								</div>
							</div>
							<span className='text-xs leading-[1.125rem] text-white/50'>{TimePassedFromDate(notification.date)}</span>
						</div>
					</div>
					<Button
						onClick={Follow}
						data-subscribed={user?.subscribed}
						className='data-[subscribed=true]:!bg-[#1F1F1F] text-sm h-10 min-h-10 rounded-full'
					>
						{user?.subscribed ? "Unfollow" : "Follow"}
					</Button>
				</div>
				<div className='pl-14'>
					<span className='whitespace-nowrap text-sm font-medium text-foreground'>Followed to you</span>
				</div>
			</div>
			<UserModal open={open} setOpen={setOpen} user={user} subscribe={user?.subscribed} />
		</>
	);
}
