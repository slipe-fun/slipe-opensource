import { PagesContentTypeContext } from "@/hooks/contexts/posts-type";
import { useEffect, useContext, useState } from "react";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { NotificationsModal } from "../../modals";

export default function StateHome({ url }) {
	const [notifsOpen, setNotifsOpen] = useState(false);
	const { activeContent, setActiveContent } = useContext(PagesContentTypeContext);

	useEffect(() => {
		setActiveContent("forYou");
	}, [url]);

	return (
		<>
			<Button
				data-isactive={notifsOpen}
				onClick={() => setNotifsOpen(true)}
				size='icon'
				className='rounded-full data-[isactive=false]:bg-foreground/[0.08]  data-[isactive=true]:bg-foreground data-[isactive=false]:text-foreground data-[isactive=true]:text-background'
			>
					<Svg className='!w-[1.875rem] !h-[1.875rem]' icon={icons["bell"]} />
			</Button>
			<div className='rounded-full p-1 relative flex h-[3.25rem] w-full bg-foreground/[0.08]'>
				<div
					data-isactive={activeContent == "follows"}
					className='absolute data-[isactive=true]:translate-x-full data-[isactive=false]:translate-x-0 duration-200 ease-out w-[calc(50%-0.25rem)] h-[calc(100%-0.5rem)] rounded-full bg-foreground/[0.08]'
				/>
				<Button
					data-isactive={activeContent == "forYou"}
					onClick={() => setActiveContent("forYou")}
					size='full'
					variant='transparent'
					className='h-full bg-transparent data-[isactive=true]:opacity-100 data-[isactive=false]:opacity-50 rounded-full min-h-full'
				>
					Blogs
				</Button>
				<Button
					data-isactive={activeContent == "follows"}
					onClick={() => setActiveContent("follows")}
					size='full'
					variant='transparent'
					className='h-full bg-transparent data-[isactive=true]:opacity-100 data-[isactive=false]:opacity-50 rounded-full min-h-full'
				>
					Follows
				</Button>
			</div>
			<Button
				data-isactive={url == "/search"}
				size='icon'
				asChild
				className='rounded-full data-[isactive=false]:bg-foreground/[0.08]  data-[isactive=true]:bg-foreground data-[isactive=false]:text-foreground data-[isactive=true]:text-background'
			>
				<Link to='/search'>
					<Svg className='!w-7 !h-7' icon={icons["search"]} />
				</Link>
			</Button>
			<NotificationsModal open={notifsOpen} setOpen={setNotifsOpen}/>
		</>
	);
}
