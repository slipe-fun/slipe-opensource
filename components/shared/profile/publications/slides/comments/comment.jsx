import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import PixelAvatar from "../../../../pixels-avatar";
import cdn from "@/constants/cdn";
import { TimePassedFromDate } from "@/lib/utils";
import { DeleteModal } from "@/components/shared/modals";
import { useState } from "react";
import Img from "@/components/ui/image";

export default function Comment({ user, comment, date, deleteComment }) {
	const [isDelete, setIsDelete] = useState(false);

	return (
		<div className='p-3 bg-card flex rounded-[1.125rem] origin-center flex-col gap-[0.375rem]'>
			<div className='w-full flex gap-3 items-center'>
				<div className='w-full flex gap-3 duration-200 ease-out items-center overflow-hidden'>
					{user?.avatar ? (
						<Img className="object-cover bg-center" wrapperClassName='rounded-full min-w-12 h-12' src={`${cdn}/avatars/${user?.avatar}`} />
					) : (
						<PixelAvatar size={48} username={user?.username} pixels={user?.pixel_order} />
					)}
					<div className='flex flex-col w-full overflow-hidden'>
						<div className='w-full flex gap-1'>
							<div className='whitespace-nowrap overflow-hidden max-w-fit text-[0.9375rem] leading-[1.3125rem] text-ellipsis font-medium text-foreground'>
								{user?.nickname ? user?.nickname : user?.username}
							</div>
						</div>
						<span className='text-sm text-[0.8125rem] leading-[1.125rem] text-foreground/50'>{TimePassedFromDate(date)}</span>
					</div>
				</div>
				<DeleteModal open={isDelete} setOpen={setIsDelete} object={comment} deleteComment={deleteComment} content='comment' nested={false}>
					<Button
						data-active={isDelete}
						onClick={() => setIsDelete(true)}
						size='iconSm'
						className='rounded-full data-[active=true]:bg-red-foreground data-[active=true]:text-white bg-red-foreground/35 text-red-foreground hover:bg-red-foreground/30'
					>
						<Svg className='!w-7 !h-7' icon={icons["trash"]} />
					</Button>
				</DeleteModal>
			</div>
			<p className='pl-[3.75rem] break-words'>{comment?.text}</p>
		</div>
	);
}
