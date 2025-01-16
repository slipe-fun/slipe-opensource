import { PageModal } from "@/components/shared/modals";
import { Avatar, Badge, Banner, DisplayName, NameColor, Username } from "./profile";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SettingsCheck } from "@/lib/utils";
import { toast } from "sonner";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";
import { fetcher } from "@/lib/utils";
import { mutate } from "@/hooks/useCacheFetcher";

export default function ProfileSettingsModal({ open, setActiveModal, user, setUser }) {
	const [banner, setBanner] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const [username, setUsername] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [nameColor, setNameColor] = useState(null);
	const [badge, setBadge] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [settingsForm, setSettingsForm] = useState(null);
	const { token, store } = useStorage();

	useEffect(() => {
		const formdata = new FormData();
		formdata.append("avatar", avatar);
		formdata.append("banner", banner);
		formdata.append("username", username);
		formdata.append("nickname", displayName);
		formdata.append("description", user?.description || "");
		formdata.append("nickname_color", nameColor);
		formdata.append("badge", badge);
		setSettingsForm(formdata);
	}, [banner, avatar, username, displayName, nameColor, badge]);

	function findErrors() {
		return Object.keys(SettingsCheck).map(name => {
			const error = SettingsCheck[name](settingsForm.get(name));

			if (error) toast.error(error || "Error", { className: "bg-red text-red-foreground" });

			return !!error;
		}).filter(Boolean)[0]
	}

	async function Settings () {
		setIsLoading(true);
		try {
			if (!findErrors()) {
				const settingsRequest = await fetcher(api.v1 + `/settings/profile`, "post", settingsForm, { "Authorization": "Bearer " + await store.get("token") });

				if (settingsRequest?.response.status === 200) {
					toast.success("New settings saved!", { className: "bg-green text-green-foreground" });

					const userRequest = await fetcher(api.v1 + "/account/info/get", "get", null, { Authorization: "Bearer " + token });

					if (userRequest?.success[0]) {
						mutate(api.v1 + "/account/info/get", userRequest);
						setUser(userRequest?.success[0]);				
					}

					setActiveModal(false);
				} else toast.error(settingsRequest?.error || settingsRequest?.message || "Server error", { className: "bg-red text-red-foreground" });
			}
		} catch (error) {
			toast.error(error || "App error" || "Server error", { className: "bg-red text-red-foreground" });
		}
		setIsLoading(false);
	}

	return (
		<PageModal element='settingsModal' className='flex flex-col overflow-hidden bg-background' open={open}>
			<div className='w-full p-4 flex top-0 z-50 bg-background/90 justify-center fixed backdrop-blur-2xl text-lg font-medium'>Profile settings</div>
			<div className='h-full w-full flex flex-col gap-4 pt-[3.75rem] pb-24 overflow-y-auto'>
				<Banner user={user} setBanner={setBanner} />
				<Avatar user={user} setAvatar={setAvatar} />
				<Username user={user} setUsername={setUsername} />
				<DisplayName user={user} setDisplayName={setDisplayName} />
				<NameColor user={user} setNameColor={setNameColor} />
				<Badge user={user} setBadge={setBadge} />
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
				<Button disabled={isLoading} onClick={Settings} className='rounded-full' size='full'>
					Save
				</Button>
			</div>
		</PageModal>
	);
}
