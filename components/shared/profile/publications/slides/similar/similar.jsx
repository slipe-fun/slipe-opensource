import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import api from "@/constants/api";
import UserCard from "@/components/shared/home/slides/no-follows/user-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { fetcher } from "@/lib/utils";
import NoContent from "@/components/shared/no-content";

export default function Similar({ token, user_id }) {
	const {
		data: users,
		isLoading: isLoading,
		error: error
	} = useCacheFetcher(`${api.v2}/user/${user_id}/similar`, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	if (error)
		return <NoContent image='error.png' title='No data' primary='Try reloading the page or app' className='py-12 animate-[fadeIn_0.3s_ease-out]' />;
	if (isLoading)
		<div className='grid grid-cols-2 h-fit min-h-[50vh] gap-4'>
			{Array.from({ length: 20 }, (_, i) => i).map(index => (
				<Skeleton key={index} className='w-full animate-[fadeInOpacity_0.3s_ease-out] aspect-square rounded-[1.125rem]' />
			))}
		</div>

	return (
		<>
			{users?.success?.length > 0 ?
				<div className='grid grid-cols-2 h-fit min-h-[50vh] gap-4'>
					{users?.success?.map(user => (
						<UserCard user={user} />
					))}
				</div> 
			: <NoContent image='error.png' title='No data' primary='Similar users not found' className='py-12 animate-[fadeIn_0.3s_ease-out]' />}
		</>
	);
}
