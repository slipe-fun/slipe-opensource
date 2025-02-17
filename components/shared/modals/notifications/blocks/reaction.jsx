import Img from "@/components/ui/image";
import PixelAvatar from "@/components/shared/pixels-avatar";
import { TimePassedFromDate } from "@/lib/utils";
import cdn from "@/constants/cdn";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ReactionBlock({ notification, token }) {
	const [user, setUser] = useState(notification?.from_user);
	const reaction = notification?.object;

	return (
		<div className='w-full border border-foreground/[0.1] bg-block rounded-lg flex p-3 flex-col gap-[0.125rem]'>
			<div className='w-full flex items-center gap-4'>
				<div className='w-full flex gap-3 duration-200 ease-out items-center overflow-hidden active:opacity-80'>
					{user?.avatar ? (
						<Img wrapperClassName='rounded-full min-w-11 h-11' iconClassName="!w-7 !h-7" src={`${cdn}/avatars/${user?.avatar}`} />
					) : (
						<PixelAvatar size={44} username={user?.username || "Anonymous"} pixels={user?.pixel_order || [...Array(16).keys()]} />
					)}
					<div className='flex flex-col w-full overflow-hidden'>
						<div className='w-full flex gap-1'>
							<div className='whitespace-nowrap overflow-hidden text-sm max-w-fit text-ellipsis font-medium text-foreground'>{user?.nickname || user?.username || "Anonymous"}</div>
						</div>
						<span className='text-xs leading-[1.125rem] text-white/50'>{TimePassedFromDate(notification.date) || "Unknown"}</span>
					</div>
				</div>
				<Button size='iconSm' variant='secondary' className='rounded-full bg-foreground/[0.08] w-11 min-w-11 h-11 min-h-11 hover:bg-foreground[0.06]'>
					<img loading='lazy' src={typeof reaction === "object" ? reaction?.name?.startsWith("emoji_")
										? `emojis/old/${reaction?.name}`
										: `emojis/new/${reaction?.name[0]}/${reaction?.name.slice(2, reaction?.name.length)}.png` : "undefined_reaction"} className='w-7 h-7' />
				</Button>
			</div>
			<div className='pl-14'>
				<span className='whitespace-nowrap text-sm font-medium text-foreground'>Put a reaction</span>
			</div>
		</div>
	);
}
