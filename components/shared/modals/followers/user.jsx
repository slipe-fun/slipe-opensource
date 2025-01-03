import { useEffect, useState } from "react";
import { useStorage } from "@/hooks/contexts/session";
import { Button } from "@/components/ui/button";
import cdn from "@/constants/cdn";
import PixelAvatar from "@/components/shared/pixels-avatar";
import follow from "@/lib/users/follow";
import UserModal from "../user-modal/user-modal";

export default function User({ user, setModalOpen }) {
	const [localUser, setLocalUser] = useState(user);
	const [open, setOpen] = useState(false);
	const [state, setState] = useState(localUser?.subscribed);
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

	useEffect(() => {
		setLocalUser(user);
		setState(user?.subscribed);
	}, [user]);

	const dd = () => {
		setOpen(true)
		setModalOpen(false)	
	}

	return (
		<div className='w-full flex gap-3 duration-200 ease-out '>
			<div onClick={() => dd()} className='w-full flex gap-3 active:opacity-80 items-center overflow-hidden'>
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
					<span className='text-sm text-white/50'>{user.username}</span>
				</div>
			</div>
			<Button data-subscribed={state} className='data-[subscribed=true]:!bg-[#1F1F1F] rounded-full' onClick={subscribe}>
				{state ? "Unfollow" : "Follow"}
			</Button>
			<UserModal setOpen={setOpen} open={open} user={user} />
		</div>
	);
}
