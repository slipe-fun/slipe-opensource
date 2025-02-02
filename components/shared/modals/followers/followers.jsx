import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import SearchBar from "../search-modal/search-bar";
import { useEffect, useState, useRef } from "react";
import User from "./user";
import NoContent from "../../no-content";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import { GetUniqueById } from "@/lib/utils";
import api from "@/constants/api";
import { useStorage } from "@/hooks/contexts/session";
import { fetcher } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "@/components/ui/skeleton";
import { UserModal } from "../../modals";

export default function FollowersModal({ children, user, open, scrollableTarget, setOpen }) {
	const [searchValue, setSearchValue] = useState("");
	const [followers, setFollowers] = useState([]);
	const [page, setPage] = useState(1);
	const [currentUser, setCurrentUser] = useState();
	const [userModalOpen, setUserModalOpen] = useState(false);
	const { token } = useStorage();

	const requestRef = useRef(0);

	const url = open
		? searchValue?.trim()?.length > 0
			? `${api.v2}/user/${user?.id}/followers/search?q=${searchValue}&page=${page}`
			: `${api.v2}/user/${user?.id}/followers?page=${page}`
		: null;

	const {
		data: followersRequest,
		isLoading,
		error,
	} = useCacheFetcher(url, async url => {
		requestRef.current += 1;
		const currentRequest = requestRef.current;
		const response = await fetcher(url, "get", null, { Authorization: "Bearer " + token });
		if (currentRequest === requestRef.current) {
			return response;
		}
		return null;
	});

	useEffect(() => {
		if (!open) {
			setFollowers([]);
			setPage(1);
		}
	}, [open]);

	useEffect(() => {
		setPage(1);
		setFollowers([]);
	}, [searchValue]);

	useEffect(() => {
		if (followersRequest?.success && !error) {
			setFollowers(prev => GetUniqueById([...prev, ...followersRequest?.success]));
		}
	}, [followersRequest]);

	return (
		<>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>{children}</DrawerTrigger>
				<DrawerContent className='bg-modal border-0'>
					<DrawerHeader className='p-4 duration-200 ease-out data-[shadowed=true]:pointer-events-none'>
						<DrawerTitle className='font-medium'>{user.username}'s followers</DrawerTitle>
					</DrawerHeader>
					<ul id={scrollableTarget} className='w-full duration-200 !h-[32.5rem] overflow-y-auto ease-out px-4 relative pb-[calc(88px+var(--safe-area-inset-bottom))] flex flex-col gap-4'>
						{!error ?
							<>
								{user.subscribers > 0 ?
									<>{followers.length > 0 ? (
										<InfiniteScroll
											hasMore={followers?.length < Number(user?.subscribers)}
											next={() => setPage(prev => prev + 1)}
											scrollableTarget={scrollableTarget}
											dataLength={followers?.length}
											className='w-full overflow-y-auto flex flex-col gap-5'
										>
											{followers.map(follower => (
												<User setCurrentUser={setCurrentUser} setUserModalOpen={setUserModalOpen} setModalOpen={setOpen} user={follower} />
											))}
										</InfiniteScroll>
									) : null}
										{isLoading
											? [...Array(8).keys()].map(index => (
												<div className='flex justify-between' key={index}>
													<div className='flex gap-2'>
														<Skeleton className='rounded-full w-12 h-12' />
														<div className='h-12 flex flex-col gap-[0.375rem]'>
															<Skeleton className='h-full w-28' />
															<Skeleton className='h-full w-20' />
														</div>
													</div>
													<Skeleton className='h-12 w-24 rounded-full' />
												</div>
											))
											: null}</>
									: <NoContent
										className='h-full p-0 animate-[fadeIn_0.3s_ease-out]'
										title="You don't have subscribers yet"
										primary='Perhaps the first subscribers will be here soon'
										image='nothing.png'
									/>}
							</>
						: <NoContent image='error.png' title='No data' primary='Try reloading the page or app' className='py-12 animate-[fadeIn_0.3s_ease-out]' />}
					</ul>
					<DrawerFooter
						data-shadowed={user?.subscribers === "1"}
						id='categories-scroller'
						className='p-4 w-full data-[shadowed=true]:opacity-40 data-[shadowed=true]:pointer-events-none flex-row fixed items-end bottom-0 pb-[calc(8px+var(--safe-area-inset-bottom))] bg-modal z-10 flex gap-4'
					>
						<SearchBar value={searchValue} setValue={setSearchValue} className='bg-foreground/[0.08]' placeholder='Search for followers' />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
			<UserModal setOpen={setUserModalOpen} open={userModalOpen} user={currentUser} />
		</>
	);
}
