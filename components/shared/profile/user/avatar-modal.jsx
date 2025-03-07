import { useClickAway } from "react-use";
import { PageModal } from "../../modals";
import PixelAvatar from "../../pixels-avatar";
import cdn from "@/constants/cdn";
import { useRef } from "react";
import icons from "@/components/ui/icons/icons";
import Svg from "@/components/ui/icons/svg";
import { Button } from "@/components/ui/button";
import Img from "@/components/ui/image";

export default function AvatarModal({ user, open, setOpen, isModal }) {
	const avatarModalRef = useRef(null);

	useClickAway(avatarModalRef, () => {
		setOpen(false);
	});

	return (
		<PageModal
			element={isModal ? "profileModal" : null}
			className='flex justify-center flex-col items-center bg-background/35 p-12 backdrop-blur-lg'
			open={open}
		>
			<div className='flex w-full justify-center h-full items-center'>
				{user.avatar ? (
					<Img ref={avatarModalRef} wrapperClassName='rounded-full w-full aspect-square' className="object-cover" src={`${cdn}/avatars/${user.avatar}`} />
				) : (
					<PixelAvatar ref={avatarModalRef} size={128} username={user.username} className='w-full aspect-square' pixels={user.pixel_order} />
				)}
			</div>
			<Button variant='secondary' className='rounded-full bg-foreground/10' size='icon'>
				<Svg className='!w-[1.625rem] !h-[1.625rem]' icon={icons["x"]} />
			</Button>
		</PageModal>
	);
}
