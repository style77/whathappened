import { motion } from "framer-motion"


export const Header: React.FC = () => {
    const navItems = ["Product", "Solutions", "Resources", "Company", "Pricing"];
    return (
        <>
            <div className="h-screen w-full relative overflow-hidden flex bg-[url(bg.png)] bg-cover custom-bg before:content-[''] before:bg-transparent before:bg-repeat before:bg-[length:182px] before:opacity-[0.12] before:top-[0] before:left-[0] before:absolute before:h-full before:w-full rounded-b-xl">
                <div className="h-full w-full flex flex-col items-center relative z-[1]">
                    <div className="absolute top-0 left-1/2 translate-y-[-50%] translate-x-[-50%] w-96 h-96 rounded-full blur-[300px] bg-white z-0"></div>
                    <div className="h-20 w-11/12 px-16 flex flex-row justify-between items-center">
                        <div className="flex flex-row text-white items-center gap-8">
                            <motion.h1
                                className="font-semibold text-white text-xl mr-12"
                                initial={{ opacity: 0, scale: -0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                WhatHappened
                            </motion.h1>

                            {navItems.map((item, index) => (
                                <motion.a
                                    key={index}
                                    className=""
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex flex-row gap-4">
                            <motion.button
                                className="btn h-10 min-h-0 bg-white/20 border-white/10 text-white shadow-xl"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: navItems.length * 0.2 }}
                            >
                                Sign in
                            </motion.button>
                            <motion.button
                                className="btn h-10 min-h-0 bg-white text-[#0d0c13] border-white border-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: (navItems.length + 1) * 0.2 }}
                            >
                                Get Started
                            </motion.button>
                        </div>
                    </div>
                    <div className="h-3/4 w-full flex flex-col items-center mt-16 gap-8 relative">
                        <motion.a initial={{ y: -100, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1 } }} className="flex flex-row items-center bg-white/20 pl-4 py-1.5 rounded-lg border border-white/10 text-gray-200 shadow-xl">
                            <p className="pr-4 font-light">Discover the new WhatHappened 1.0</p>
                            <span className="bg-white/25 rounded-lg py-1 px-2 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </motion.a>
                        <motion.h1 initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1, delay: 0.2 } }} className="text-6xl text-white font-medium w-11/12 md:w-4/12 text-center ">The simplest way to identify how your users f***ed up.</motion.h1>
                        <motion.p initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1, delay: 0.4 } }} className="md:w-4/12 px-4 md:px-0 text-center text-lg text-white/85 font-thin">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</motion.p>
                        <div className="flex flex-row gap-4">
                            <motion.button initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1, delay: 0.6 } }} className="btn bg-white text-[#0d0c13] border-white drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">Get Started</motion.button>
                            <motion.button initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: [0, 0, 1], transition: { duration: 1, delay: 1.1 } }} className="btn bg-white/20 border-white/10 text-white shadow-xl">How It Works</motion.button>
                        </div>
                    </div>
                    <div className="flex h-min w-full justify-center">
                        <motion.div initial={{ y: 150, opacity: 0, scale: 0.5 }} whileInView={{ y: 0, opacity: [0, 0, 1], scale: 1, transition: { duration: 1, delay: 1.4 } }} className="absolute shadow-xl bottom-0 border-white/10 rounded-t-xl border-[16px] border-b-0 bg-transparent h-[172px] max-w-[701px] md:h-[294px] md:max-w-[912px]">
                            <div className="overflow-hidden h-full w-full">
                                <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac-dark.png" className="w-full rounded-none" alt="" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header