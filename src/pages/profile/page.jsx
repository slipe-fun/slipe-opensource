import { Banner, Description, Publications, User } from "@/components/shared/profile/profile";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import { fetcher } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Profile() {
	const { token, store } = useStorage();
	const profileRef = useRef(null);
	const { scrollY } = useScroll({ container: profileRef, offset: ["40%", "-0%"] });
	const {
		data: user,
		error: error,
		isLoading: isLoading,
	} = useCacheFetcher(api.v1 + "/account/info/get", async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	return (
		<div id="profileScroll" ref={profileRef} className='w-full h-full animate-[fadeIn_0.3s_ease-out] overflow-y-auto flex flex-col'>
			<Banner user={user?.success[0]} scrollProgress={scrollY} />{" "}
      <div className="w-full min-h-full flex flex-col gap-5">
				<User user={user?.success[0]} scrollProgress={scrollY} />
				<Description description={user?.success[0]?.description} />
				<Publications user={user?.success[0]} />
			</div>
		</div>
	);
}
