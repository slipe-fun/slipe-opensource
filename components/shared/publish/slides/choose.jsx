import icons from "@/components/ui/icons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import Svg from "@/components/ui/icons/svg";
import { motion, AnimatePresence } from "framer-motion";

const blockVariants = {
	initial: { opacity: 0, y: -15 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 15 },
};

export default function Choose({ output, hidden }) {
	const takeImage = async camera => {
		const image = await Camera.getPhoto({
			quality: 100,
			allowEditing: false,
			resultType: CameraResultType.Uri,
			source: camera ? CameraSource.Camera : CameraSource.Photos,
		});
		output(image.webPath);
	};

	return (
		<AnimatePresence>
			{!hidden && (
				<>
					<motion.div
						key='block1'
						initial='initial'
						animate='animate'
						exit='exit'
						whileTap={{ scale: 0.98, opacity: 0.8 }}
						onClick={async () => await takeImage(true)}
						className="bg-[url('/static/publish-assets/camera.png')] w-full h-full overflow-hidden bg-cover bg-center flex flex-col rounded-[1.25rem]"
						variants={blockVariants}
						transition={{ delay: 0, type: "spring" }}
					>
						<div className='w-full h-full justify-center items-center flex'>
							<Svg className='!w-32 !h-32 text-white/50' icon={icons["camera"]} />
						</div>
						<div className='w-full bg-[#242424]/60 backdrop-blur-[80px] p-5 flex flex-col gap-1'>
							<span className='text-xl font-medium text-white'>Upload from camera</span>
							<span className='text-sm text-white/50'>Needs access to your camera</span>
						</div>
					</motion.div>

					<motion.div
						key='block2'
						onClick={async () => await takeImage(false)}
						className="bg-[url('/static/publish-assets/gallery.png')] w-full h-full overflow-hidden bg-cover bg-center flex flex-col rounded-[1.25rem]"
						variants={blockVariants}
						initial='initial'
						animate='animate'
						exit='exit'
						whileTap={{ scale: 0.98, opacity: 0.8 }}
						transition={{ delay: 0.1, type: "spring" }}
					>
						<div className='w-full h-full justify-center items-center flex'>
							<Svg className='!w-32 !h-32 text-white/50' icon={icons["image"]} />
						</div>
						<div className='w-full bg-[#242424]/60 backdrop-blur-[80px] p-5 flex flex-col gap-1'>
							<span className='text-xl font-medium text-white'>Upload from gallery</span>
							<span className='text-sm text-white/50'>Needs access to your phone gallery</span>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
