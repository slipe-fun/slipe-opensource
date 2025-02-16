import Img from "@/components/ui/image";
import PixelAvatar from "@/components/shared/pixels-avatar";
import { TimePassedFromDate } from "@/lib/utils";
import cdn from "@/constants/cdn";
import { Button } from "@/components/ui/button";

export default function ReactionBlock({ notification }) {
	return (
		<div className='w-full border border-foreground/[0.1] bg-block rounded-lg flex p-3 flex-col gap-[0.125rem]'>
			<div className='w-full flex items-center gap-4'>
				<div className='w-full flex gap-3 duration-200 ease-out items-center overflow-hidden active:opacity-80'>
					{notification?.from_user?.avatar ? (
						<Img wrapperClassName='rounded-full min-w-11 h-11' iconClassName="!w-7 !h-7" src={`${cdn}/avatars/${notification?.from_user?.avatar}`} />
					) : (
						<PixelAvatar size={44} username={notification?.from_user?.username} pixels={notification?.from_user?.pixel_order} />
					)}
					<div className='flex flex-col w-full overflow-hidden'>
						<div className='w-full flex gap-1'>
							<div className='whitespace-nowrap overflow-hidden text-sm max-w-fit text-ellipsis font-medium text-foreground'>{notification?.from_user?.nickname || notification?.from_user?.username}</div>
						</div>
						<span className='text-xs leading-[1.125rem] text-white/50'>{TimePassedFromDate(notification.date)}</span>
					</div>
				</div>
				<Button size='iconSm' variant='secondary' className='rounded-full bg-foreground/[0.08] w-11 min-w-11 h-11 min-h-11 hover:bg-foreground[0.06]'>
					<img loading='lazy' src={notification?.object?.name?.startsWith("emoji_")
										? `emojis/old/${notification?.object?.name}`
										: `emojis/new/${notification?.object?.name[0]}/${notification?.object?.name.slice(2, notification?.object?.name.length)}.png`} className='w-7 h-7' />
				</Button>
			</div>
			<div className='pl-14'>
				<span className='whitespace-nowrap text-sm font-medium text-foreground'>Put a reaction</span>
			</div>
		</div>
	);
}
