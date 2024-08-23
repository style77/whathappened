export const Card: React.FC<{ name: string; desc: string }> = ({ name, desc }) => {
    return (
        <>
            <div className="flex flex-col h-min gap-4 rounded-xl bg-white">
                <img className="rounded-xl shadow-md" src="https://i.imgur.com/6LQGQrP.png"></img>
                <h1 className="flex flex-row items-center gap-3 text-xl font-semibold text-black/75">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.04 16.5.5-1.5h6.42l.5 1.5H8.29Zm7.46-12a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Zm-3 2.25a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V9Zm-3 2.25a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z" clipRule="evenodd" />
                    </svg>
                    {name}
                </h1>
                <p className="font-light text-black/75">{desc}</p>
            </div>
        </>
    )
}

export default Card