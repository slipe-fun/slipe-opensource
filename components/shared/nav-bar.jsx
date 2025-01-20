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
	} = useCacheFetcher(
		url.pathname != "/auth" ? api.v1 + "/account/info/get" : null,
		async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }),
		{
			cache: true,
		}
	);

	return (
		<>
			{url.pathname !== "/auth" ? (
				<div className='bg-navigation pb-[--safe-area-inset-bottom] w-screen border-t-[1px] border-foreground/10 fixed flex bottom-0 backdrop-blur-[80px] z-50'>
					<NavLink
						to='/'
						data-active={url.pathname === "/"}
						className='w-full items-center flex justify-center flex-col h-[4.5rem] data-[active=false]:text-foreground/25 data-[active=true]:text-primary text-foreground'
					>
						<Svg className='!w-[2.3125rem] !h-[2.3125rem] duration-200 ease-out' icon={icons["blogs"]} />
						<span className="text-[0.8125rem] duration-200 ease-out">Blogs feed</span>
					</NavLink>
					<NavLink
						data-active={url.pathname === "/add"}
						to='/add'
						className='w-full items-center flex justify-center flex-col h-[4.5rem] data-[active=false]:text-foreground/25 data-[active=true]:text-primary text-foreground'
					>
						<Svg className='!w-[2.3125rem] !h-[2.3125rem] duration-200 ease-out' icon={icons["plus"]} />
						<span className="text-[0.8125rem] duration-200 ease-out">Publishing</span>
					</NavLink>
					<NavLink
						data-active={url.pathname === "/profile"}
						to='/profile'
						className='w-full items-center flex justify-center flex-col h-[4.5rem] data-[active=false]:text-foreground/25 data-[active=true]:text-primary text-foreground'
					>
						<div className='w-[2.3125rem] h-[2.3125rem] flex justify-center items-center'>
							{!error ? (
								<>
									{user?.success[0].avatar ? (
										<img data-active={url.pathname === "/profile"} loading='lazy' className='w-[1.875rem] h-[1.875rem] rounded-full duration-200 ease-out data-[active=false]:opacity-25' src={`${cdn}/avatars/${user?.success[0]?.avatar}`} />
									) : (
										<PixelAvatar data-active={url.pathname === "/profile"} className="duration-200 ease-out data-[active=false]:opacity-25" size={36} username={user?.success[0]?.username} pixels={user?.success[0]?.pixel_order} />
									)}
								</>
							) : null}
						</div>
						<span className="text-[0.8125rem] duration-200 ease-out">My profile</span>
					</NavLink>
				</div>
			) : null}
		</>
	);
}
