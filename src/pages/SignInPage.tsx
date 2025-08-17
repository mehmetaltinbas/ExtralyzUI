export function SignInPage() {
    return (
        <div className="h-[75%] flex flex-col justify-center items-center gap-2">
            <p className="font-bold text-lg">Sign In</p>
            <input type="text" placeholder="username..." className="p-2 border rounded-full" />
            <input
                type="password"
                placeholder="password..."
                className="p-2 border rounded-full"
            />
            <button className="px-2 py-[2px] border rounded-[10px] bg-[#0d408c] text-white text-sm">
                sign in
            </button>
        </div>
    );
}
