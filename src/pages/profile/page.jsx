import { Banner, Description, Publications, User } from "@/components/shared/profile/profile";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import { fetcher } from "@/lib/utils";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Profile() {
	const { token, store } = useStorage();
	const [user, setUser] = useState()
	const profileRef = useRef(null);
	const { scrollY } = useScroll({ container: profileRef, offset: ["40%", "-0%"] });
	const {
		data: userReq,
		error: error,
		isLoading: isLoading,
	} = useCacheFetcher(api.v1 + "/account/info/get", async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }), {
		cache: true
	});

	useEffect(() => setUser(userReq?.success[0]), [userReq])

	return (
		<div id='profileScroll' ref={profileRef} className='w-full h-full animate-[fadeIn_0.3s_ease-out] overflow-y-auto'>
			<Banner user={user} scrollProgress={scrollY} />
			<div className='w-full min-h-full flex flex-col gap-4'>
				<User user={user} scrollProgress={scrollY} />
				<Description user={user} changeUserDescription={description => {
					setUser(prev => {return {...prev, description}})
				}}/>
				<Publications user={user} />
			</div>
		</div>
	);
}
