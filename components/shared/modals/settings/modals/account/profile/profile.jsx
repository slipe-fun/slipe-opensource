import { PageModal } from "@/components/shared/modals";
import { Avatar, Badge, Banner, DisplayName, NameColor, Username } from "./profile";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ProfileSettingsModal({ open, setActiveModal, user }) {
	const [banner, setBanner] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const [username, setUsername] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [nameColor, setNameColor] = useState(null);
	const [badge, setBadge] = useState(null);

	return (
		<PageModal element='settingsModal' className='flex flex-col overflow-hidden bg-background' open={open}>
			<div className='w-full p-4 flex top-0 z-50 bg-background/90 justify-center fixed backdrop-blur-2xl text-lg font-medium'>Profile settings</div>
			<div className='h-full w-full flex flex-col gap-4 pt-[3.75rem] pb-24 overflow-y-auto'>
				<Banner user={user} setBanner={setBanner}/>
				<Avatar user={user} setAvatar={setAvatar}/>
				<Username user={user} setUsername={setUsername}/>
				<DisplayName user={user} setDisplayName={setDisplayName}/>
				<NameColor user={user} setNameColor={setNameColor}/>
				<Badge user={user} setBadge={setBadge}/>
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
