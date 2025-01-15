import { ShufflePixels, PixelsColors } from "@/lib/utils";
import cdn from "@/constants/cdn";
import { useEffect, useState } from "react";

export default function Banner({ user, setBanner }) {
	const [rawImage, setRawImage] = useState("");
	const [banner, setLocalBanner] = useState("");

	useEffect(() => {
		if (rawImage) {
			const reader = new FileReader();
			reader.onload = fileReaderEvent => {
				setLocalBanner(fileReaderEvent.target.result);
			};
			reader.readAsDataURL(rawImage);
		}
	}, [rawImage]);

	useEffect(() => setBanner(rawImage), [rawImage]);
	useEffect(() => {
		async function changeBanner() {
			if (user?.banner) {
				const profileBanner = await fetch(cdn + "/banners/" + user?.banner).then(async res => await res.blob()).catch(() => null);

				if (profileBanner)
					setRawImage(new File([profileBanner], "banner.png", {
						type: profileBanner?.type
					}))
			}
		}
		changeBanner();
	}, [user]);

	return (
		<div className='w-full flex flex-col px-5 gap-3'>
			<div className='flex items-center'>
				<span className='text-2xl font-medium w-full'>Banner</span>
				<span className='text-lg min-w-fit text-foreground/50'>Max 5mb</span>
			</div>
			<div className='w-full active:opacity-90 aspect-[16/11] relative flex p-3 duration-200 ease-out overflow-hidden rounded-2xl justify-center items-end'>
				{banner ? (
					<img loading='lazy' src={banner ? banner : cdn + "/banners/" + user?.banner} className='w-full absolute top-0 left-0 h-full -z-10 object-cover' />
				) : (
					<div className='grid grid-cols-7 bg-black top-0 left-0 grid-rows-1 absolute -z-10 h-full w-full'>
						{ShufflePixels(user?.pixel_order)?.map((pixel, index) => (
							<span
								key={index}
								style={{ background: `${PixelsColors[user?.username[0]]}`, opacity: 0.25 * pixel }}
								className='w-full aspect-square'
							/>
						))}
					</div>
				)}
				<span className='text-foreground/50 text-lg z-10'>Tap to select image</span>
				<span className='w-full h-full absolute bottom-0 bg-gradient-to-t from-[#00000040] to-50% to-[#00000000] block' />
				<input
					onChange={e => {
						if (e.target.files && e.target.files.length > 0) {
							setRawImage(e.target.files[0]);
						}
					}}
					type='file'
					className='w-full h-full absolute z-20 opacity-0'
				/>
			</div>
		</div>
	);
}
