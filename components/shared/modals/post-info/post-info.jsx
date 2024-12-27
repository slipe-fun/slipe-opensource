import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import Footer from "./footer";
import { TimePassedFromDate } from "@/lib/utils";
import cdn from "@/constants/cdn";

export default function PostInfoModal({ children, open, setOpen, post, deleteBlog }) {
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='bg-modal border-0'>
				<DrawerHeader className='p-3 z-20 fixed w-full justify-center'>
					<span className='w-12 h-1 rounded-full bg-white/50 block' />
				</DrawerHeader>
				<div className='w-full h-[32.5rem] overflow-y-auto rounded-t-3xl flex flex-col gap-5'>
					<div className='relative w-full overflow-hidden aspect-[16/10] min-h-fit rounded-b-[1.25rem]'>
						<img loading="lazy" src={cdn + "/posts/" + post?.image} className='w-full absolute -z-10 h-full object-cover' />
						<span className='w-full h-full bg-gradient-to-b from-[#00000040] to-50% to-[#00000000] block' />
					</div>
					<div className='flex flex-col gap-1 px-5'>
						<span className='text-lg text-foreground/50'>Name</span>
						<span className='text-xl font-medium text-foreground'>{post?.in_search || "Untitled post"}</span>
					</div>
					<div className='flex flex-col gap-1 px-5'>
						<span className='text-lg text-foreground/50'>Publish date</span>
						<span className='text-xl font-medium text-foreground'>{TimePassedFromDate(post?.date) || "Never :)"}</span>
					</div>
					<div className='flex flex-col gap-1 px-5'>
						<span className='text-lg text-foreground/50'>Views</span>
						<span className='text-xl font-medium text-foreground'>{post?.views || 0}</span>
					</div>
					<div className='flex flex-col gap-1 px-5'>
						<span className='text-lg text-foreground/50'>Category</span>
						<span className='text-xl font-medium text-foreground'>{post?.category[0]?.toUpperCase() + post?.category?.slice(1) || "No category"}</span>
					</div>
				</div>
				<Footer post={post} deleteBlog={deleteBlog}/>
			</DrawerContent>
		</Drawer>
	);
}
