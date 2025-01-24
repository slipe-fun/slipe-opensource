import { useEffect, useState } from "react";
import { TimePassedFromDate } from "@/lib/utils";
import { useStorage } from "@/hooks/contexts/session";
import { Button } from "@/components/ui/button";
import cdn from "@/constants/cdn";
import PixelAvatar from "@/components/shared/pixels-avatar";
import follow from "@/lib/users/follow";
import { UserModal } from "@/components/shared/modals";

export default function UserBlock({ user, setUser, date }) {
	const [localUser, setLocalUser] = useState(user);
	const [state, setState] = useState(localUser?.subscribed);
	const [subscribers, setSubscribers] = useState(localUser?.subscribers);
	const [open, setOpen] = useState(false);
	const { token, store } = useStorage();

	async function subscribe() {
		setState(!state);
		setSubscribers(!state ? subscribers + 1 : subscribers - 1);

		const followRequest = await follow(user?.id, token);

		if (followRequest?.error) {
			setSubscribers(prev => prev - 1);
			if (state) setState(true);
			else setState(false);
		}
	}

	useEffect(() => {setUser({ ...user, subscribers, subscribed: state }); console.log(state, subscribers)}, [state, subscribers]);

	useEffect(() => {
		setLocalUser(user);
		setSubscribers(user.subscribers)
		setState(user?.subscribed);
	}, [user]);

	return (
		<div className='w-full z-10 p-4 flex gap-3 bg-gradient-to-b from-[#00000060] to-[#00000000]'>
			<div onClick={() => setOpen(true)} className='w-full flex gap-3 duration-200 ease-out items-center overflow-hidden active:opacity-80'>
				{localUser?.avatar ? (
					<img loading='lazy' className='rounded-full w-12 h-12' src={`${cdn}/avatars/${localUser?.avatar}`} />
				) : (
					<PixelAvatar size={48} username={localUser?.username} pixels={localUser?.pixel_order} />
				)}
				<div className='flex flex-col w-full overflow-hidden'>
					<div className='w-full flex gap-1'>
						<div className='whitespace-nowrap overflow-hidden text-[0.9375rem] leading-[1.3125rem] max-w-fit text-ellipsis font-medium text-white'>
							{localUser?.nickname ? localUser?.nickname : localUser?.username}
						</div>
					</div>
					<span className='text-[0.8125rem] leading-[1.125rem] text-white/75'>{TimePassedFromDate(date)}</span>
				</div>
			</div>
			<Button data-subscribed={state} className='data-[subscribed=true]:!bg-[#1F1F1F] rounded-full' onClick={subscribe}>
				{state ? "Unfollow" : "Follow"}
			</Button>
			<UserModal setOpen={setOpen} user={localUser} open={open} subscribe={subscribe} />
		</div>
	);
}
