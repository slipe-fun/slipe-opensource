import { fetcher } from "@/lib/utils";
import api from "@/constants/api";
import { useState, useEffect, useContext } from "react";
import UsersSlider from "@/components/shared/home/sliders/users";
import { PagesContentTypeContext } from "@/hooks/contexts/posts-type";
import { useStorage } from "@/hooks/contexts/session";
import { Skeleton } from "@/components/ui/skeleton";
import NoFollows from "@/components/shared/home/slides/no-follows/no-follows";
import NoContent from "@/components/shared/no-content";
import addView from "@/lib/posts/addView";

export default function Home() {
	const { token, store } = useStorage();
	if (!token) window.location.href = "/auth";

	const [startData, setStartData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	const [users, setUsers] = useState([]);
	const [blogs, setBlogs] = useState([]);

	const { activeContent, setActiveContent } = useContext(PagesContentTypeContext);

	useEffect(() => {
		setBlogs([]);
		setUsers([]);
	}, [activeContent]);

	useEffect(() => {
		setUsers([]);
		setBlogs([]);
		(async () => {
			setIsLoading(true);
			const request = await fetcher(api.v1 + `/post/get?after=0&region=slavic${activeContent === "follows" ? "&subscribed=true" : `&preferences=[${await store.get("preferences")}]`}`, "get", null, {
				Authorization: "Bearer " + token,
			});
			setIsLoading(false);
			if (request?.success) setStartData(request);
			else setStartData(request?.error);
		})();
	}, [activeContent]);

	useEffect(() => {
		if (!isLoading && startData?.success) {
			const users = Object.keys(startData?.success);
			const currentUser = startData?.success[users[0]] || null
			const currentPost = currentUser?.posts || null

			setUsers(users);

			const allBlogs = users.flatMap(username => {
				const user = startData.success[username];
				return user?.posts?.map(post => ({ ...post, author: user.author })) || [];
			});

			setBlogs(allBlogs);

			addView(currentPost, token)
		}
	}, [startData, isLoading, error]);

	return (
		<>
			{!isLoading ? (
				blogs?.length > 0 ? (
					<UsersSlider users={users} blogs={blogs} type={activeContent} />
				) : activeContent === "follows" ? (
					<NoFollows />
				) : (
					<NoContent image="error.png" title="No data" primary="Try reloading the page or app" className="h-screen px-4 animate-[fadeIn_0.3s_ease-out]"/>
				)
			) : (
				<div className="pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(5.5625rem+var(--safe-area-inset-bottom))] animate-[fadeIn_0.3s_ease-out] w-full h-full px-4">
					<Skeleton className="rounded-[2rem] h-full w-full" />
				</div>
			)}
		</>
	);
	
}
