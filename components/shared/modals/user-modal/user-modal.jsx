import { Banner, Description, Publications, User } from "@/components/shared/profile/profile";
import { useScroll } from "framer-motion";
import { PageModal } from "../../modals";
import { useRef, useEffect, useState } from "react";
import Header from "./header";

export default function UserModal({ open, setOpen, user, subscribe }) {
	const profileModalRef = useRef(null);
	const { scrollY } = useScroll({ container: open ? profileModalRef : null, offset: ["40%", "-0%"] });
	const [dateId, setDateId] = useState(0);

	useEffect(() => setDateId(new Date().getTime()), []);

	return (
		<PageModal id='profileModal' className='bg-background duration-300 ease-out overflow-hidden' open={open}>
			<Header user={user} setOpen={setOpen} />
			<div id={`profileScrollModal-${dateId}`} ref={open ? profileModalRef : null} className='overflow-y-auto w-full h-full'>
				<Banner user={user} scrollProgress={scrollY} />
				<div className='w-full min-h-full flex flex-col gap-5'>
					<User user={user} scrollProgress={scrollY} subscribe={subscribe} isModal />
					<Description user={user} isModal />
					<Publications dateId={dateId} user={user} isModal />
				</div>{" "}
			</div>
		</PageModal>
	);
}
