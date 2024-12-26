export default function Description({ description }) {
    return(
        <div className="flex flex-col gap-2 w-full px-4">
            <div className="flex items-center">
                <span className="text-2xl font-medium w-full">About me</span>
                <button className="text-lg text-primary font-medium">Edit</button>
            </div>
            <p className="text-foreground/50 break-words text-lg">
                {description?.length > 0  ? description : "No description."}
            </p>
        </div>
    )
}