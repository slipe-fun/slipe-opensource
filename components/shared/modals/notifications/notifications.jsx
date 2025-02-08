import { PageModal } from "../../modals";
import Header from "./header";
import SwitcherBar from "./switcher-bar";

export default function NotificationsModal({ open, setOpen }) {
	return (
			<PageModal open={open}>
				<Header setOpen={setOpen}/>
				<div className='flex flex-col overflow-hidden duration-300 ease-out bg-background w-full h-full'>
					
				</div>
				<SwitcherBar/>
			</PageModal>
	);
}
