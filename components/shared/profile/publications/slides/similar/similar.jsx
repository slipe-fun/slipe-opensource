import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import api from "@/constants/api";
import UserCard from "@/components/shared/home/slides/no-follows/user-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { fetcher } from "@/lib/utils";

export default function Similar({ token, user_id }) {
	const {
		data: users,
		isLoading: isLoading,
		error: error
	} = useCacheFetcher(`${api.v2}/user/${user_id}/similar`, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	if (error) 
		return <NoContent image='error.png' title='No data' primary='Try reloading the page or app' className='py-12 animate-[fadeIn_0.3s_ease-out]' />;
	if (isLoading)
		<div className='grid grid-cols-2 h-fit min-h-[50vh] gap-5'>
			{Array.from({ length: 20 }, (_, i) => i).map(index => (
				<Skeleton key={index} className='w-full animate-[fadeInOpacity_0.3s_ease-out] aspect-square rounded-[1.125rem]' />
			))}
		</div>

	return (
		<div className='grid grid-cols-2 h-fit min-h-[50vh] gap-5'>
			{users?.length ? users?.map(user => (
				<UserCard user={user} />
			)) : <>Error dikiy do error output here pls</>}
		</div>
	);
}
