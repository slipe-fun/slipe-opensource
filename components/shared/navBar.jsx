import icons from "../ui/icons/icons";
import Svg from "../ui/icons/svg";
import { useLocation } from "react-router";
import { useStorage } from "@/hooks/contexts/session";
import { fetcher } from "@/lib/utils";
import PixelAvatar from "./pixels-avatar";
import cdn from "@/constants/cdn";
import { NavLink } from "react-router";
import api from "@/constants/api";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";

export default function NavBar() {
	const url = useLocation();
	const { token, store } = useStorage();
	const {
		data: user,
		error: error,
		isLoading: isLoading,
	} = useCacheFetcher(url.pathname != "/auth" ? api.v1 + "/account/info/get" : null, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }), {
		cache: true
	});

	return (
		<>
			{url.pathname !== "/auth" ? (
				<div className='bg-background/90 w-screen fixed flex bottom-0 backdrop-blur-2xl z-50 animate-[fadeIn_0.3s_ease-out]'>
					<NavLink to='/' className='w-full pt-4 pb-6 flex justify-center text-foreground'>
						{({ isActive }) => (
							<Svg
								data-isactive={isActive}
								className='duration-200 ease-out data-[isactive=true]:opacity-100 data-[isactive=false]:opacity-25 !w-11 !h-11'
								icon={icons["blogs"]}
							/>
						)}
					</NavLink>
					<NavLink to='/add' className='w-full pt-4 pb-6 flex justify-center text-foreground'>
						{({ isActive }) => (
							<Svg
								data-isactive={isActive}
								className='duration-200 ease-out data-[isactive=true]:opacity-100 data-[isactive=false]:opacity-25 !w-11 !h-11'
								icon={icons["plus"]}
							/>
						)}
					</NavLink>
					<NavLink to='/profile' className='w-full pt-4 pb-6 flex justify-center text-foreground'>
						{({ isActive }) => (
							<div
								data-isactive={isActive}
								className='w-11 h-11 flex justify-center items-center data-[isactive=true]:opacity-100 data-[isactive=false]:opacity-50'
							>
								{!error ? (
									<>{user?.success[0].avatar ? (
										<img loading="lazy" className='w-9 h-9 rounded-full' src={`${cdn}/avatars/${user?.success[0]?.avatar}`} />
									) : (
										<PixelAvatar size={36} username={user?.success[0]?.username} pixels={user?.success[0]?.pixel_order} />
									)}</>
								) : null}
							</div>
						)}
					</NavLink>
				</div>
			) : null}
		</>
	);
}
