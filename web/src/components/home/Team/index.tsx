import { motion } from "framer-motion"
import Card from "./Card"

export const Team: React.FC = () => {
    return (
        <>
            <div className="h-min w-full flex bg-[#fefefe] my-24 justify-center">
                <div className="w-full md:w-11/12 px-8 md:px-16 flex flex-col">
                    <div className="flex flex-col items-center gap-6">
                        <motion.a initial={{ y: -100, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1 } }} className="flex flex-row gap-1 border rounded-lg p-1.5 text-sm items-center w-24">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>

                            Our Team
                        </motion.a>
                        <motion.h1 initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1 } }} className="text-4xl font-semibold text-center">See Who Our Leadership Is</motion.h1>
                        <motion.p initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1, delay: 0.2 } }} className="font-light text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</motion.p>
                    </div>
                    <div className="flex flex-col md:flex-wrap md:flex-row items-center justify-center gap-8 mt-12">
                        <motion.div className="md:w-1/4" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: [0, 0, 1], transition: { duration: 1 } }}>
                            <Card name="Joachim Hodana" rank="Founder" avatar="https://avatars.githubusercontent.com/u/36776006?v=4" desc="Lorem ipsum dolor sit amet" github="https://github.com/style77" linkedin="https://www.linkedin.com/in/joachim-hodana-33815b245" personal="https://joachimhodana.com"/>                            
                        </motion.div>
                        <motion.div className="md:w-1/4" initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: [0, 0, 1], transition: { duration: 1 } }}>
                            <Card name="Dominik Krakowiak" rank="Front-End Developer" avatar="https://avatars.githubusercontent.com/u/47526067?v=4" desc="Lorem ipsum dolor sit amet" github="https://github.com/th11n"/>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Team