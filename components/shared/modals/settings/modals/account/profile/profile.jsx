import { PageModal } from "@/components/shared/modals";
import { Avatar, Badge, Banner, DisplayName, NameColor, Username } from "./profile";
import { Button } from "@/components/ui/button";

export default function ProfileSettingsModal({ open, setActiveModal, user }) {
	return (
		<PageModal element='settingsModal' className='flex flex-col overflow-hidden bg-background' open={open}>
			<div className='w-full p-4 flex top-0 z-50 bg-background/90 justify-center fixed backdrop-blur-2xl text-lg font-medium'>Profile settings</div>
			<div className='h-full w-full flex flex-col gap-4 px-5 pt-[3.75rem] pb-24 overflow-y-auto'>
				<Banner />
				<Avatar />
				<Username />
				<DisplayName />
				<NameColor />
				<Badge />
			</div>
			<div className='p-5 fixed flex gap-5 w-full z-10 bg-background/90 backdrop-blur-2xl bottom-0'>
				<Button
					onClick={() => setActiveModal("")}
					variant='secondary'
					className='rounded-full bg-foreground/[0.12] hover:bg-foreground/[0.08]'
					size='full'
				>
					Cancel
				</Button>
				<Button className='rounded-full' size='full'>
					Save
				</Button>
			</div>
		</PageModal>
	);
}
