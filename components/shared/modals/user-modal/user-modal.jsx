import { Banner, Description, Publications, User } from "@/components/shared/profile/profile";
import { useScroll } from "framer-motion";
import { PageModal } from "../../modals";
import { useEffect, useRef } from "react";

export default function UserModal({ open, setOpen, user }) {
	const profileModalRef = useRef(null);
	const { scrollY } = useScroll({ container: open ? profileModalRef : null, offset: ["40%", "-0%"] });

	useEffect(() => {
		console.log(profileModalRef, scrollY);
	}, [scrollY, profileModalRef]);

	return (
		<PageModal className='bg-background' open={open}>
			<div id='profileScrollModal' ref={open ? profileModalRef : null} className='overflow-y-auto duration-300 ease-out flex flex-col w-full h-full'>
				<Banner user={user} scrollProgress={scrollY} />
				<div className='w-full min-h-full flex flex-col gap-5'>
					<User user={user} scrollProgress={scrollY} isModal />
					<Description user={user} isModal />
					<Publications user={user} isModal />
				</div>{" "}
			</div>
		</PageModal>
	);
}
