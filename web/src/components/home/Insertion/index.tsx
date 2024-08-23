import { motion } from "framer-motion"

export const Insertion: React.FC = () => {
    return (
        <>
            <div className="h-min w-full flex relative overflow-hidden bg-[url(bg2.png)] bg-cover custom-bg before:content-[''] before:bg-transparent before:bg-repeat before:bg-[length:182px] before:opacity-[0.12] before:top-[0] before:left-[0] before:absolute before:h-full before:w-full rounded-xl">
                <div className="h-full w-full flex flex-col gap-8 text-white items-center justify-center relative z-[1] my-36">
                    <div className="absolute bottom-[-160px] right-0 w-1/2 h-64 blur-[300px] bg-cyan-300 z-0"></div>
                    <motion.h1 initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1 } }} className="text-6xl font-medium md:w-2/6 w-10/12 text-center">A Better Way To Work Today, Together</motion.h1>
                    <motion.p initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1 } }} className="px-8 md:px-0 md:w-1/2 text-center text-white/75">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</motion.p>
                    <div className="flex flex-row gap-4 z-[1]">
                        <motion.button initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: [0, 0, 1], transition: { duration: 1 } }} className="btn bg-white text-[#0d0c13] border-white drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">Get Started</motion.button>
                        <motion.button initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: [0, 0, 1], transition: { duration: 1 } }} className="btn bg-white/20 border-white/10 text-white shadow-xl">How It Works</motion.button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Insertion