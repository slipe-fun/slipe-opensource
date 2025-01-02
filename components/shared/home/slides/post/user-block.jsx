import { useEffect, useState } from "react";
import { TimePassedFromDate } from "@/lib/utils";
import { useStorage } from "@/hooks/contexts/session";
import { Button } from "@/components/ui/button";
import cdn from "@/constants/cdn";
import PixelAvatar from "@/components/shared/pixels-avatar";
import follow from "@/lib/users/follow";
import UserModal from "@/components/shared/modals/user-modal/user-modal";

export default function UserBlock({ user, setUser, date }) {
	const [localUser, setLocalUser] = useState(user);
	const [state, setState] = useState(localUser?.subscribed);
	const [open, setOpen] = useState(false);
	const { token, store } = useStorage();

	async function subscribe() {
		if (state) setState(false);
		else setState(true);

		const followRequest = await follow(user?.id, token);

		if (followRequest?.error) {
			if (state) setState(true);
			else setState(false);
		}
	}

	useEffect(() => setUser({ ...user, subscribed: state }), [state]);

	useEffect(() => {
		setLocalUser(user);
		setState(user?.subscribed);
	}, [user]);

	return (
		<div className='w-full z-10 p-5 flex gap-3 bg-gradient-to-b from-[#00000060] to-[#00000000]'>
			<div onClick={() => setOpen(true)} className='w-full flex gap-3 duration-200 ease-out items-center overflow-hidden active:opacity-80'>
				{localUser?.avatar ? (
					<img loading='lazy' className='rounded-full w-12 h-12' src={`${cdn}/avatars/${localUser?.avatar}`} />
				) : (
					<PixelAvatar size={48} username={localUser?.username} pixels={localUser?.pixel_order} />
				)}
				<div className='flex flex-col w-full overflow-hidden'>
					<div className='w-full flex gap-1'>
						<div className='whitespace-nowrap overflow-hidden max-w-fit text-ellipsis font-medium text-white'>
							{localUser?.nickname ? localUser?.nickname : localUser?.username}
						</div>
					</div>
					<span className='text-sm text-white/75'>{TimePassedFromDate(date)}</span>
				</div>
			</div>
			<Button data-subscribed={state} className='data-[subscribed=true]:!bg-[#1F1F1F] rounded-full' onClick={subscribe}>
				{state ? "Unfollow" : "Follow"}
			</Button>
			<UserModal setOpen={setOpen} user={localUser} open={open} />
		</div>
	);
}
