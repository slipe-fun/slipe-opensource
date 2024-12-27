import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import { ReportModal, PostDownloadModal, PostDeletingModal } from "../../modals";
import { useState } from "react";
import { toast } from "sonner";
import { DrawerFooter } from "@/components/ui/drawer";
import { useStorage } from "@/hooks/contexts/session";
import { useCacheFetcher } from "@/hooks/useCacheFetcher";
import api from "@/constants/api";
import { fetcher } from "@/lib/utils";

export default function Footer({ post, deleteBlog }) {
	const [isCopied, setIsCopied] = useState(false);
	const [isReport, setIsReport] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [isDownload, setIsDownload] = useState(false);

	const { token, storage } = useStorage();

	const {
		data: user,
		error: userError,
		isLoading: isUserLoading,
	} = useCacheFetcher(api.v1 + "/account/info/get", async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

	const copyLink = () => {
		toast.success("Post link copied!", { className: "bg-green text-green-foreground" });
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 2500);
	};

	return (
		<DrawerFooter className='p-5 flex-row overflow-x-auto flex gap-5'>
			<ReportModal open={isReport} setOpen={setIsReport} post={post}>
				<Button
					data-active={isReport}
					onClick={() => setIsReport(true)}
					variant='secondary'
					className='rounded-full data-[active=true]:bg-foreground data-[active=true]:text-background'
					size='icon'
				>
					<Svg icon={icons["flag"]} className='!w-8 !h-8' />
				</Button>
			</ReportModal>
			{user?.success[0].id === post?.author_id ? (
				<PostDeletingModal open={isDelete} setOpen={setIsDelete} post={post} deleteBlog={deleteBlog}>
					<Button
						data-active={isDelete}
						onClick={() => setIsDelete(true)}
						variant='secondary'
						className='rounded-full data-[active=true]:bg-red-foreground data-[active=true]:text-white bg-red-foreground/35 text-red-foreground hover:bg-red-foreground/30'
						size='icon'
					>
						<Svg icon={icons["trash"]} className='!w-8 !h-8' />
					</Button>
				</PostDeletingModal>				
			) : null}
			<Button
				data-copied={isCopied}
				onClick={copyLink}
				variant={isCopied ? "success" : "secondary"}
				className='rounded-full data-[copied=true]:pointer-events-none relative'
				size='icon'
			>
				<Svg
					data-ispassword={isCopied}
					icon={icons["link"]}
					className='absolute duration-200 ease-out data-[ispassword=false]:opacity-100 data-[ispassword=false]:translate-y-0 data-[ispassword=true]:translate-y-4 data-[ispassword=true]:opacity-0 !w-8 !h-8'
				/>
				<Svg
					data-ispassword={isCopied}
					icon={icons["checkmark"]}
					className='absolute duration-200 data-[ispassword=true]:opacity-100 data-[ispassword=false]:opacity-0 data-[ispassword=false]:-translate-y-4 data-[ispassword=true]:translate-y-0 ease-out !w-7 !h-7'
				/>
			</Button>
			<PostDownloadModal open={isDownload} setOpen={setIsDownload} post={post}>
				<Button
					data-active={isDownload}
					onClick={() => setIsDownload(true)}
					variant='secondary'
					className='rounded-full data-[active=true]:bg-foreground data-[active=true]:text-background'
					size='icon'
				>
					<Svg icon={icons["download"]} className='!w-8 !h-8' />
				</Button>
			</PostDownloadModal>
			{user?.success[0]?.admin ? (
				<Button variant='secondary' className='rounded-full' size='icon'>
					<Svg icon={icons["slashedEye"]} className='!w-8 !h-8' />
				</Button>				
			) : null}
		</DrawerFooter>
	);
}
