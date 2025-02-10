import Img from "@/components/ui/image";
import PixelAvatar from "@/components/shared/pixels-avatar";
import cdn from "@/constants/cdn";
import { Button } from "@/components/ui/button";

export default function FollowBlock({ notification }) {
	return (
		<div className='w-full border border-foreground/[0.1] bg-block rounded-lg flex p-3 flex-col gap-[0.125rem]'>
			<div className='w-full flex items-center gap-4'>
				<div className='w-full flex gap-3 duration-200 ease-out items-center overflow-hidden active:opacity-80'>
					{notification?.avatar ? (
						<Img wrapperClassName='rounded-full min-w-11 h-11' iconClassName='!w-7 !h-7' src={`${cdn}/avatars/${notification?.avatar}`} />
					) : (
						<PixelAvatar size={44} username={notification?.username} pixels={notification?.pixel_order} />
					)}
					<div className='flex flex-col w-full overflow-hidden'>
						<div className='w-full flex gap-1'>
							<div className='whitespace-nowrap overflow-hidden text-sm max-w-fit text-ellipsis font-medium text-foreground'>Dikiy</div>
						</div>
						<span className='text-xs leading-[1.125rem] text-white/50'>2 days ago</span>
					</div>
				</div>
				<Button className='data-[subscribed=true]:!bg-[#1F1F1F] text-sm h-10 min-h-10 rounded-full'>
					Follow
				</Button>
			</div>
			<div className='pl-14'>
				<span className='whitespace-nowrap text-sm font-medium text-foreground'>Followed to you</span>
			</div>
		</div>
	);
}
