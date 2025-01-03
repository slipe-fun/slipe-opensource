import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import SearchBar from "../search-modal/search-bar";
import { useEffect, useState } from "react";
import User from "./user";
import NoContent from "../../no-content";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import { GetUniqueById } from "@/lib/utils";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";
import { fetcher } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";

export default function FollowersModal({ children, user, open, scrollableTarget, setOpen }) {
	const [searchValue, setSearchValue] = useState();
	const [focus, setFocus] = useState(false);

	const [followers, setFollowers] = useState([]);
	const [page, setPage] = useState(1);

	const { token, store } = useStorage();

	const url = open ? `${api.v2}/user/${user?.id}/followers?page=${page}` : null

	const {
		data: followersRequest,
		isLoading: isLoading,
		error: error
	} = useCacheFetcher(url, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }))

	useEffect(() => {
		if (followersRequest?.success && !error) {
			setFollowers(prev => GetUniqueById([...prev, ...followersRequest?.success]));
		}
	}, [followersRequest]);

	useEffect(() => {
		if (!open) {
			setFollowers([]);
			setPage(1);
		}
	}, [open])

	if (error)
		return <NoContent image='error.png' title='No data' primary='Try reloading the page or app' className='py-12 animate-[fadeIn_0.3s_ease-out]' />;

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader
					data-shadowed={focus}
					className='p-5 duration-200 ease-out data-[shadowed=true]:opacity-30 data-[shadowed=true]:pointer-events-none'
				>
					<DrawerTitle className='font-medium'>{user.username}'s followers</DrawerTitle>
				</DrawerHeader>
				<ul
					id={scrollableTarget}
					data-shadowed={focus}
					className='w-full duration-200 !h-[32.5rem] overflow-y-auto ease-out data-[shadowed=true]:opacity-40 px-5 relative pb-24 flex flex-col gap-5'
				>
					{followers ? (
						<InfiniteScroll
							hasMore={followers?.length < Number(user?.subscribers)}
							next={() => setPage(prev => prev + 1)}
							scrollableTarget={scrollableTarget}
							dataLength={followers?.length}
							className='w-full duration-200 !h-[32.5rem] overflow-y-auto ease-out data-[shadowed=true]:opacity-40 px-5 relative pb-24 flex flex-col gap-5'
						>
							{followers.map(follower => <User user={follower} />)}
						</InfiniteScroll>
					) : (
						<NoContent
							className='h-full p-0 animate-[fadeIn_0.3s_ease-out]'
							title="You don't have subscribers yet"
							primary='Perhaps the first subscribers will be here soon'
							image='nothing.png'
						/>
					)}
					{isLoading ? <h1>Loading...</h1> : null}
				</ul>
				<DrawerFooter
					data-shadowed={user?.subscribers === "1"}
					id='categories-scroller'
					className='p-5 w-full data-[shadowed=true]:opacity-30 flex-row fixed items-end bottom-0 bg-modal z-10 flex gap-4'
				>
					<SearchBar
						setFocus={setFocus}
						value={searchValue}
						setValue={setSearchValue}
						className='bg-foreground/[0.08]'
						placeholder='Search for followers'
					/>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
