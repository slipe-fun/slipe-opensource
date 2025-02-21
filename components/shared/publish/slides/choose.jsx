import icons from "@/components/ui/icons/icons";
import Svg from "@/components/ui/icons/svg";

export default function Choose() {
	return (
		<>
			<div className="bg-[url('/static/publish-assets/camera.png')] w-full h-full overflow-hidden bg-cover bg-center active:scale-[0.98] active:opacity-80 duration-200 ease-out animate-[fadeIn_0.3s_easeOut] flex flex-col rounded-[1.25rem]">
				<div className='w-full h-full justify-center items-center flex'>
					<Svg className='!w-32 !h-32 text-white/50' icon={icons["camera"]} />
				</div>
				<div className='w-full bg-[#242424]/60 backdrop-blur-[80px] p-5 flex flex-col gap-1'>
					<span className='text-xl font-medium text-white'>Upload from camera</span>
					<span className='text-sm text-white/50'>Needs access to your camera</span>
				</div>
			</div>
            <div className="bg-[url('/static/publish-assets/gallery.png')] w-full h-full overflow-hidden bg-cover bg-center active:scale-[0.98] active:opacity-80 duration-200 ease-out animate-[fadeIn_0.4s_easeOut] flex flex-col rounded-[1.25rem]">
				<div className='w-full h-full justify-center items-center flex'>
					<Svg className='!w-32 !h-32 text-white/50' icon={icons["image"]} />
				</div>
				<div className='w-full bg-[#242424]/60 backdrop-blur-[80px] p-5 flex flex-col gap-1'>
					<span className='text-xl font-medium text-white'>Upload from gallery</span>
					<span className='text-sm text-white/50'>Needs access to your phone gallery</span>
				</div>
			</div>
		</>
	);
}
