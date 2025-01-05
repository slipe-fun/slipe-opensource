import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { HomeState, ProfileState } from "./states";
import { animate } from "motion";

export default function Header() {
	const url = useLocation();

	const [currentPage, setCurrentPage] = useState();

	useEffect(() => {
		animate("#header-wrapper", { opacity: 0 }, { ease: "easeOut", duration: 0.1 }).then(() => {
			animate("#header-wrapper", { opacity: 1 }, { ease: "easeOut", duration: 0.1 });
			setCurrentPage(url.pathname);
		});
	}, [url]);

	return (
		<>
			{currentPage !== "/auth" ? (
				<header
					id='header-wrapper'
					data-isbg={currentPage == "/profile"}
					className='w-screen opacity-100 data-[isbg=false]:bg-background/90 data-[isbg=false]:backdrop-blur-2xl fixed z-50 p-4'
				>
					<div className='flex opacity-100 w-full gap-5 justify-between'>
						{currentPage == "/" ? <HomeState url={currentPage} /> : currentPage == "/profile" ? <ProfileState /> : null}
					</div>
				</header>
			) : null}
		</>
	);
}