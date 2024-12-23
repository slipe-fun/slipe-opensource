import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import PixelAvatar from "../../../../pixels-avatar";
import cdn from "@/constants/cdn";
import { TimePassedFromDate } from "@/lib/utils";

export default function Comment({ user, content, date }) {
	return (
		<div className='p-4 bg-card flex rounded-[1.25rem] origin-center flex-col gap-2'>
			<div className='w-full flex gap-3 items-center'>
				<div className='w-full flex gap-3 duration-200 ease-out items-center overflow-hidden'>
					{user?.avatar ? (
						<img loading='lazy' className='rounded-full min-w-12 object-cover bg-center w-12 h-12' src={`${cdn}/avatars/${user?.avatar}`} />
					) : (
						<PixelAvatar size={48} username={user?.username} pixels={user?.pixel_order} />
					)}
					<div className='flex flex-col w-full overflow-hidden'>
						<div className='w-full flex gap-1'>
							<div className='whitespace-nowrap overflow-hidden max-w-fit text-ellipsis font-medium text-foreground'>
								{user?.nickname ? user?.nickname : user?.username}
							</div>
						</div>
						<span className='text-sm text-foreground/50'>{TimePassedFromDate(date)}</span>
					</div>
				</div>
				<Button size='iconSm' className='rounded-full bg-red-foreground/35 hover:bg-red-foreground/30 text-red-foreground'>
					<Svg className='!w-7 !h-7' icon={icons["trash"]} />
				</Button>
			</div>
			<p className='pl-[3.75rem] break-words'>{content}</p>
		</div>
	);
}
