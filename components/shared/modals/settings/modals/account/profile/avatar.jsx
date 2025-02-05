import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import cdn from "@/constants/cdn";
import PixelAvatar from "@/components/shared/pixels-avatar";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/effect-creative";
import Img from "@/components/ui/image";

export default function Avatar({ user, setAvatar }) {
	const [rawImage, setRawImage] = useState("");
	const [avatar, setLocalAvatar] = useState("");

	useEffect(() => {
		if (rawImage) {
			const reader = new FileReader();
			reader.onload = fileReaderEvent => {
				setLocalAvatar(fileReaderEvent.target.result);
			};
			reader.readAsDataURL(rawImage);
		}
	}, [rawImage]);

	useEffect(() => setAvatar(rawImage), [rawImage]);
	useEffect(() => {
		async function changeAvatar() {
			if (user?.avatar) {
				const profileAvatar = await fetch(cdn + "/avatars/" + user?.avatar).then(async res => await res.blob()).catch(() => null);

				if (profileAvatar)
					setRawImage(new File([profileAvatar], "avatar.png", {
						type: profileAvatar?.type
					}))
			}
		}

		changeAvatar();
	}, [user]);

	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='flex items-center px-5'>
				<span className='text-2xl font-medium w-full'>Avatar</span>
				<span className='text-lg min-w-fit text-foreground/50'>Max 3mb</span>
			</div>
			<Swiper
				initialSlide={1}
				creativeEffect={{
					limitProgress: 2,
					prev: {
						opacity: 0.4,
						translate: ["-118%", 0, 0],
					},
					next: {
						opacity: 0.4,
						translate: ["118%", 0, 0],
					},
				}}
				effect='creative'
				slidesPerView='auto'
				centeredSlides
				modules={[EffectCreative]}
				className='w-full'
			>
				<SwiperSlide className='w-40 !h-40'>
					<div className='bg-foreground/[0.12] relative rounded-full w-40 h-40 flex justify-center items-center'>
						<Svg icon={icons["image"]} className='!w-[4.75rem] !h-[4.75rem]' />
						<input
							onChange={e => {
								if (e.target.files && e.target.files.length > 0) {
									setRawImage(e.target.files[0]);
								}
							}}
							type='file'
							className='w-full h-full absolute z-10 opacity-0'
						/>
					</div>
				</SwiperSlide>
				{user?.avatar || avatar ? (
					<SwiperSlide className='w-40 !h-40'>
						<Img src={avatar ? avatar : `${cdn}/avatars/${user?.avatar}`} wrapperClassName='h-full w-full rounded-full' />
					</SwiperSlide>
				) : null}

				<SwiperSlide className='w-40 !h-40'>
					<PixelAvatar size={160} username={user?.username} pixels={user?.pixel_order} />
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
