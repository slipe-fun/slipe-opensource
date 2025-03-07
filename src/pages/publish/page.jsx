import Header from "@/components/shared/publish/header";
import Choose from "@/components/shared/publish/slides/choose";
import ToolsBar from "@/components/shared/publish/tools-bar";
import PublishSlide from "@/components/shared/publish/slides/publish/publish";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { EffectCreative } from "swiper/modules";
import Editor from "@/components/shared/publish/slides/editor";

import "swiper/css";
import "swiper/css/effect-creative";

export default function Publish() {
	const [swiper, setSwiper] = useState(null);
	const [active, setActive] = useState(0);
	const [image, setImage] = useState(null);
	const [categoryFocused, setCategoryFocused] = useState(false);
	const [chooseConfirm, setChooseConfirm] = useState(false);

	// Publish slide states

	const [name, setName] = useState("");
	const [category, setCategory] = useState("Techologies");
	const [comments, setComments] = useState(true);
	const [reactions, setReactions] = useState(true);

	//

	const slideClassName = useMemo(
		() => "h-full flex gap-4 flex-col pt-[calc(6.3125rem+var(--safe-area-inset-top))] pb-[calc(6.1875rem+var(--safe-area-inset-bottom))] px-4",
		[]
	);

	useEffect(() => {
		if (swiper) {
			swiper.slideTo(active);
		}
	}, [active, swiper]);

	useEffect(() => {
		if (image) {
			setActive(1);
		}
	}, [image]);

	const discardChanges = useCallback(() => {
		setImage(null);
		setChooseConfirm(false);
		setActive(0);
		setName("");
		setCategory("");
		setComments(true);
		setReactions(true);
	}, []);

	return (
		<>
			<Header setSlide={setActive} confirmed={chooseConfirm} discardChanges={discardChanges} slide={active} />
			<Swiper
				onSwiper={setSwiper}
				allowTouchMove={false}
				onActiveIndexChange={slider => setActive(slider.activeIndex)}
				creativeEffect={{
					prev: {
						opacity: 0,
						translate: ["-106%", 0, 0],
					},
					next: {
						opacity: 0,
						translate: ["106%", 0, 0],
					},
				}}
				effect='creative'
				className='w-full h-full no3d-swiper'
				slidesPerView={1}
				modules={[EffectCreative]}
			>
				<SwiperSlide className={slideClassName}>
					<Choose hidden={active !== 0} output={setImage} />
				</SwiperSlide>
				<SwiperSlide className={slideClassName}>
					<Editor hidden={active !== 1} confirmed={chooseConfirm} image={image} />
				</SwiperSlide>
				<SwiperSlide className={slideClassName}>
					<PublishSlide
						setName={setName}
						name={name}
						category={category}
						setCategory={setCategory}
						comments={comments}
						setComments={setComments}
						reactions={reactions}
						setReactions={setReactions}
						hidden={active !== 2}
						categoryFocused={categoryFocused}
						setCategoryFocused={setCategoryFocused}
					/>
				</SwiperSlide>
			</Swiper>
			<ToolsBar
				setCategoryFocused={setCategoryFocused}
				categoryFocused={categoryFocused}
				confirmed={chooseConfirm}
				setConfirmed={setChooseConfirm}
				setSlide={setActive}
				setImage={setImage}
				slide={active}
			/>
		</>
	);
}
