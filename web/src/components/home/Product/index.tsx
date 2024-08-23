import { motion } from "framer-motion"
import Card from "./Card"

export const Icon1 = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 text-white">
        <path d="..." />
    </svg>
);

export const Product: React.FC = () => {
    const cardsData = [
        { id: 1, title: 'Card 1', content: 'This is card 1 content', SvgIcon: Icon1 },
        { id: 2, title: 'Card 2', content: 'This is card 2 content', SvgIcon: Icon1 },
        { id: 3, title: 'Card 3', content: 'This is card 3 content', SvgIcon: Icon1 },
        { id: 4, title: 'Card 4', content: 'This is card 4 content', SvgIcon: Icon1 },
    ];
    return (
        <>
            <div className="h-min w-full flex bg-[#fefefe] my-24 justify-center">
                <div className="w-full md:w-11/12 px-16 flex flex-col">
                    <div className="flex flex-col gap-6">
                        <motion.a initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1 } }} className="flex flex-row gap-1 border rounded-lg p-1.5 text-sm items-center w-min">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                            </svg>
                            Product
                        </motion.a>
                        <motion.h1 initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1 } }} className="text-4xl font-semibold">Everything Your App Is Looking For</motion.h1>
                        <motion.p initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1, delay: 0.2 } }} className="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
                        {cardsData.map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: [0, 0, 1] }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.5,
                                }}
                            >
                                <Card
                                    title={card.title}
                                    content={card.content}
                                    SvgIcon={card.SvgIcon}
                                    />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product