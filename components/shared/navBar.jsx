import icons from "../ui/icons/icons";
import Svg from "../ui/icons/svg";
import { useLocation } from "react-router";
import { useStorage } from "@/hooks/contexts/session";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import cdn from "@/constants/cdn";
import { NavLink } from "react-router";
import api from "@/constants/api";

export default function NavBar() {
	const { data: user, error, isLoading } = useSWR(api.v1 + "/account/info/get", async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));
	const url = useLocation();
	const { token, store } = useStorage();

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
								<img className='w-9 h-9 rounded-full' src={!isLoading ? `${cdn}/avatars/${user?.success[0]?.avatar}` : null} />
							</div>
						)}
					</NavLink>
				</div>
			) : null}
		</>
	);
}