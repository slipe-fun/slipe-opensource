import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import api from "@/constants/api";
import { useState, useEffect, useContext } from "react";
import UsersSlider from "@/components/shared/home/sliders/users";
import { useStorage } from "@/hooks/contexts/session";
import { PagesContentTypeContext } from "@/hooks/contexts/posts-type";

export default function Home() {
	const [users, setUsers] = useState([]);
	const [blogs, setBlogs] = useState([]);
	const { token, store } = useStorage();
	const { activeContent, setActiveContent } = useContext(PagesContentTypeContext);

	const {
		data: startData,
		error,
		isLoading,
	} = useSWR(api.v1 + `/post/get?after=0&region=slavic${activeContent === "follows" ? "&subscribed=true" : ""}`, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	useEffect(() => {
		if (!isLoading && startData?.success) {
			const users = Object.keys(startData.success);
			setUsers(users);

			const allBlogs = users.flatMap(username => {
				const user = startData.success[username];
				return user?.posts?.map(post => ({ ...post, author: user.author })) || [];
			});

			setBlogs(allBlogs);
		}
	}, [startData, isLoading, error]);

	return <><UsersSlider users={users} blogs={blogs} type={activeContent}/></>;
}
