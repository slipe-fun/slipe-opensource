import { Swiper, SwiperSlide } from "swiper/react";
import BlogsSlider from "./blogs";
import { Virtual } from "swiper/modules";
import { useEffect, useState } from "react";
import { useStorage } from "@/hooks/contexts/session";
import api from "@/constants/api";
import { fetcher } from "@/lib/utils";

import "swiper/css";
import NoFollows from "../slides/no-follows/no-follows";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersSlider({ users, blogs, type }) {
	const [allUsers, setUsers] = useState();
	const [allBlogs, setBlogs] = useState();

	const { token, store } = useStorage();

	useEffect(() => {
		setUsers(users);
		setBlogs(blogs);
	}, [users, blogs]);

	async function onSlideChange(slide) {
		const currentSlide = slide.activeIndex;
		const greatestIndex = allUsers.length - 1;
		const allUserIds = [...new Set(allBlogs.map(blog => blog.author.id))];

		if (greatestIndex - currentSlide === 1) {
			const reqBlogs = await fetcher(
				`${api.v1}/post/get?after=0&users=[${allUserIds}]&region=slavic${type === "follows" ? "&subscribed=true" : ""}`,
				"get",
				null,
				{ Authorization: "Bearer " + token }
			);
			if (reqBlogs?.success) {
				const reqUsers = Object.keys(reqBlogs?.success);

				setUsers(oldValue => [...oldValue, ...reqUsers]);
				setBlogs(oldValue => [
					...oldValue,
					...reqUsers.flatMap(username => {
						const user = reqBlogs?.success[username];
						return user?.posts?.map(post => ({ ...post, author: user.author })) || [];
					}),
				]);
			}
		}
	}

	useEffect(() => {
		setUsers([]);
		setBlogs([]);
	}, [type]);

	return (
		<>
			{allBlogs?.length === 0 && type === "follows" ? (
				<>
					<NoFollows />
				</>
			) : null}
			{allBlogs?.length > 0 ? (
				<>
					<Swiper slidesPerView={1} modules={[Virtual]} direction='vertical' className='!w-full !h-full' onSlideChange={onSlideChange} virtual>
						{allUsers?.map((username, index) => (
							<SwiperSlide key={index} virtualIndex={index} className='w-full h-full'>
								<BlogsSlider blogs={allBlogs.filter(blog => blog.author.username === username)} />
							</SwiperSlide>
						))}
					</Swiper>
				</>
			) : (
				<div className="py-[6.5rem] animate-[fadeIn_0.3s_ease-out] w-full h-full px-5">
					<Skeleton className="rounded-[2rem] h-full w-full"/>
				</div>
			)}
		</>
	);
}
