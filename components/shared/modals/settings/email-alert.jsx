export default function EmailAlert() {
    return(
        <div className="w-full rounded-3xl bg-primary/35 flex gap-[0.875rem] text-primary p-[0.875rem]">
            <img src="./static/states-assets/email.png" className="w-11 h-11"/>
            <div className="w-full flex flex-col">
                <span className="font-semibold">Confirm email</span>
                <span className="font-medium opacity-75 text-sm">You need to confirm email to full functional</span>
            </div>
        </div>
    )
}