import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import { useStorage } from "@/hooks/contexts/session";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import api from "@/constants/api";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import icons from "@/components/ui/icons/icons";
import { toast } from "sonner";
import { fetcher } from "@/lib/utils";
import { SettingsModal } from "../../modals";

export default function StateProfile() {
	const [isCopied, setIsCopied] = useState(false);
	const [open, setOpen] = useState(false);
	const { token, store } = useStorage();
	const [user, setUser] = useState();
	const {
		data: userReq,
		error: error,
		isLoading: isLoading,
	} = useCacheFetcher(api.v1 + "/account/info/get", async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }), {
		cache: true
	});
	

	const copyLink = async () => {
		await writeText(`https://slipe.fun/@${user?.username}`)
		toast.success("Profile link copied!", { className: "bg-green text-green-foreground" });
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 2500);
	};

	useEffect(() => setUser(userReq?.success[0]), [userReq])

	return (
		<>
			<Button
				data-copied={isCopied}
				onClick={async () => copyLink()}
				className='rounded-full data-[copied=true]:pointer-events-none hover:bg-black/35 data-[copied=true]:text-green-foreground relative bg-black/35 backdrop-blur-2xl'
				size='icon'
			>
				<Svg
					data-copied={isCopied}
					icon={icons["link"]}
					className='absolute duration-200 ease-out data-[copied=false]:opacity-100 data-[copied=false]:translate-y-0 data-[copied=true]:translate-y-4 data-[copied=true]:opacity-0 !w-8 !h-8'
				/>
				<Svg
					data-copied={isCopied}
					icon={icons["checkmark"]}
					className='absolute duration-200 data-[copied=true]:opacity-100 data-[copied=false]:opacity-0 data-[copied=false]:-translate-y-4 data-[copied=true]:translate-y-0 ease-out !w-7 !h-7'
				/>
			</Button>
			<Button
			data-active={open}
				onClick={() => setOpen(true)}
				size='icon'
				className='rounded-full data-[open=true]:bg-white hover:bg-black/35 data-[copied=true]:text-black relative bg-black/35 backdrop-blur-2xl'
			>
					<Svg className='!w-[1.875rem] !h-[1.875rem]' icon={icons["gear"]} />
			</Button>
			<SettingsModal user={user} open={open} setOpen={setOpen}/>
		</>
	);
}
