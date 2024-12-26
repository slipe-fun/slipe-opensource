import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import { useEffect, useRef, useState } from "react";
import ReactionBlock from "./reaction-block";

export default function ReactionsModal({ children, currentReaction, onReactionClicked, open, setOpen }) {
	const [activeCategory, setCategory] = useState("recently");
	const indicatorRef = useRef(null);
	const scrollerRef = useRef(null);
	const categories = [
		{ icon: icons["clock"], id: "recently", maxReactions: 5, label: "Recently used" },
		{ icon: icons["smile"], id: "0", maxReactions: 61, label: "Emojis and people" },
		{ icon: icons["gesture"], id: "1", maxReactions: 40, label: "Gestures" },
		{ icon: icons["leaf"], id: "2", maxReactions: 31, label: "Nature and animals" },
		{ icon: icons["pizza"], id: "3", maxReactions: 25, label: "Food and drinks" },
		{ icon: icons["dice"], id: "4", maxReactions: 45, label: "Objects and items" },
		{ icon: icons["map"], id: "5", maxReactions: 25, label: "Travel and vehicles" },
		{ icon: icons["symbol"], id: "6", maxReactions: 37, label: "Symbols and signs" },
	];

	const categoryClicked = category => {
		setCategory(category);
		scrollerRef.current?.scrollTo({
			top: document.getElementById(`category-item-${category}`).offsetTop,
			block: "start",
		});
	};

	const handleScroll = () => {
		const header = indicatorRef.current?.getBoundingClientRect();

		categories.map(category => {
			const element = document.getElementById(`category-item-${category.id}`)?.getBoundingClientRect();
			if (element && header.bottom > element.top && header.top < element.bottom) {
				setCategory(category.id);
			}
		});
	};

	useEffect(() => {
		document.getElementById("categories-scroller")?.scrollTo({
			left: document.getElementById(`category-button-${activeCategory}`).offsetLeft - 16,
			behavior: "smooth",
			block: "start",
		});
	}, [activeCategory]);

	useEffect(() => {
		setTimeout(() => {
			scrollerRef.current?.addEventListener("scroll", handleScroll);
		}, 10);
		return () => scrollerRef.current?.removeEventListener("scroll", handleScroll);
	}, [open]);

	return (
		<Drawer  open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader className='p-4'>
					<DrawerTitle className='font-medium'>Reactions</DrawerTitle>
				</DrawerHeader>
				<ul ref={scrollerRef} className='w-full h-[26rem] px-4 relative flex flex-col gap-4 overflow-y-auto'>
					<div ref={indicatorRef} className='w-full pointer-events-none fixed h-8 left-0' />
					{categories.map((category, index) => (
						<ReactionBlock category={category} setOpen={setOpen} key={index} currentReaction={currentReaction} onReactionClicked={onReactionClicked} />
					))}
				</ul>
				<DrawerFooter id='categories-scroller' className='p-4 flex-row overflow-x-auto flex gap-0'>
					{categories.map((category, index) => (
						<Button
							id={`category-button-${category.id}`}
							data-active={category.id == activeCategory}
							onClick={() => categoryClicked(category.id)}
							size='icon'
							className='rounded-full data-[active=true]:bg-primary hover:opacity-100 data-[active=true]:text-white hover:text-white data-[active=true]:opacity-100 text-foreground opacity-50 bg-transparent h-[3.25rem] min-h-[3.25rem] px-[1.375rem] min-w-fit w-fit'
							key={index}
						>
							<Svg icon={category.icon} className='!w-8 !h-8' />
						</Button>
					))}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
