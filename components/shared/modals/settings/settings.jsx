import { PageModal } from "../../modals";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import Header from "./header";

export default function SettingsModal({ user, open, setOpen }) {
	const settingsModalRef = useRef(null);
	const { scrollY } = useScroll({ container: open ? settingsModalRef : null, offset: ["40%", "-0%"] });

	return (
		<PageModal ref={open ? settingsModalRef : null} className='flex justify-center flex-col items-center bg-background' open={open}>
			<Header scrollProgress={scrollY} user={user} />
		</PageModal>
	);
}
