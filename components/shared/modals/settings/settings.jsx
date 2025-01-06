import { PageModal } from "../../modals";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import Header from "./header";

export default function SettingsModal({ user, open, setOpen }) {
	const settingsModalRef = useRef(null);
	const { scrollY } = useScroll({ container: open ? settingsModalRef : null, offset: ["40%", "-0%"] });

	return (
		<PageModal className='flex flex-col overflow-hidden bg-background' open={open}>
			<Header setOpen={setOpen} scrollProgress={scrollY} user={user} />
			<div ref={settingsModalRef} className='overflow-y-auto w-full h-full'>
				<div className='min-h-[1200px] p-5 pt-[16.75rem] w-full'>
					<p>sdasdasdasd</p>
				</div>
			</div>
		</PageModal>
	);
}
 