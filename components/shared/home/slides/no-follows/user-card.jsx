import { Button } from "@/components/ui/button";
import PixelAvatar from "@/components/shared/pixels-avatar";
import cdn from "@/constants/cdn";
import follow from "@/lib/users/follow";
import { useStorage } from "@/hooks/contexts/session";
import { useEffect, useState } from "react";
import { ShufflePixels, PixelsColors } from "@/lib/utils";
import Img from "@/components/ui/image";

export default function UserCard({ user }) {
	const [isFollowed, setIsFollowed] = useState(false);
	const { token, store } = useStorage();

	async function followUser () {
		if (isFollowed) setIsFollowed(false);
		else setIsFollowed(true);

		const followRequest = await follow(user?.id, token);

		if (followRequest?.error) {
			if (isFollowed) setIsFollowed(true);
			else setIsFollowed(false);
		}
	}

	useEffect(() => setIsFollowed(user?.subscribed), [user])

	return (
		<div onClick={followUser} className='rounded-[1.125rem] relative w-full aspect-square overflow-hidden'>
			{user?.banner ? (
				 <Img src={`${cdn}/banners/${user?.banner}`} wrapperClassName="w-full absolute -z-10 h-full" className="object-cover"/>
			) : (
				<div className='grid grid-cols-7 grid-rows-7 absolute -z-10 h-full w-full'>
					{ShufflePixels(user?.pixel_order)?.map((pixel, index) => (
						<span key={index} style={{ background: `${PixelsColors[user?.username[0]]}`, opacity: 0.25 * pixel }} className='w-full aspect-square' />
					))}
				</div>
			)}
           
			<div className='w-full h-full items-center flex flex-col justify-center bg-black/50 gap-[0.375rem]'>
				{user?.avatar ? (
					<Img src={cdn + `/avatars/${user?.avatar}`} wrapperClassName='aspect-square w-16 max-[384px]:w-14 min-[420px]:w-[4.5rem] rounded-full' className="object-cover" />
				) : (
					<PixelAvatar className="aspect-square w-16 max-[384px]:w-14 min-[420px]:w-[4.5rem]" username={user?.username} pixels={user?.pixel_order} />
				)}
				
				<span className='w-full text-center overflow-hidden overflow-ellipsis px-5 font-medium whitespace-nowrap text-white'>{user?.nickname ? user?.nickname : user?.username}</span>
				<Button data-subscribed={isFollowed} className="data-[subscribed=true]:!bg-[#1F1F1F] rounded-full" size='sm'>
					{isFollowed ? "Followed" : "Follow"}
				</Button>
			</div>
		</div>
	);
}
