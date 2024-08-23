import { motion } from "framer-motion";
import { useState } from "react";

export const Prices: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(1);

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleButtonClick = (index: number) => {
        setSelectedIndex(index);
    };

    const cards = [
        {
            title: 'Basic',
            price: '$19',
            period: 'per month',
            description: 'Ideal for individuals.',
            features: ['Feature A', 'Feature B', 'Feature C', 'Feature A', 'Feature B', 'Feature C'],
        },
        {
            title: 'Pro',
            price: '$29',
            period: 'per month',
            description: 'Perfect for professionals.',
            features: ['Feature X', 'Feature Y', 'Feature Z', 'Feature A', 'Feature B', 'Feature C'],
        },
        {
            title: 'Enterprise',
            price: '$49',
            period: 'per month',
            description: 'Best for businesses.',
            features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature A', 'Feature B', 'Feature C'],
        },
    ];

    return (
        <>
            <div className="h-min w-full flex justify-center relative overflow-hidden bg-[url(bg2.png)] bg-cover custom-bg before:content-[''] before:bg-transparent before:bg-repeat before:bg-[length:182px] before:opacity-[0.12] before:top-[0] before:left-[0] before:absolute before:h-full before:w-full rounded-xl">
                <div className="h-full w-full md:w-11/12 flex flex-col gap-8 text-white relative z-[1] my-12 px-16">
                    <div className="absolute bottom-[0] left-1/2 translate-y-[50%] translate-x-[-50%] w-96 h-96 rounded-full blur-[300px] bg-white z-0"></div>
                    <div className="flex flex-col gap-6">
                        <motion.a
                            initial={{ y: -25, opacity: 0 }}
                            whileInView={{ y: 0, opacity: [0, 0, 1], transition: { duration: 1 } }}
                            className="flex flex-row gap-1.5 border rounded-lg py-1.5 px-2 text-sm items-center w-min bg-white/20 border-white/10 z-[1]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                            </svg>
                            Pricing
                        </motion.a>
                        <div className="flex flex-col md:flex-row justify-between md:items-center items-start gap-4 md:gap-0">
                            <motion.h1
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: [0, 0, 1], transition: { duration: 1 } }}
                                className="text-4xl font-semibold"
                            >
                                Our Pricing
                            </motion.h1>
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: [0, 0, 1], transition: { duration: 1 } }}
                                className="flex flex-row bg-white/10 rounded-xl"
                            >
                                <input name="paymentType" type="radio" aria-label="Monthly" className="btn border-transparent m-1" checked />
                                <input name="paymentType" type="radio" aria-label="Annually" className="btn border-transparent m-1" />
                            </motion.div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center mt-12 gap-12 z-[1]">
                            {cards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    className={`rounded-xl w-full md:w-1/4 h-min transform transition-transform duration-300 ${hoveredIndex === null
                                        ? index === selectedIndex
                                            ? 'scale-110 bg-[#FEFEFE]'
                                            : 'scale-100 bg-white/10'
                                        : index === hoveredIndex
                                            ? 'scale-110 bg-[#FEFEFE]'
                                            : 'scale-100 bg-white/10'
                                    }`}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="flex flex-col p-4">
                                        <h3 className={`mb-2 font-light ${hoveredIndex === null
                                            ? index === selectedIndex
                                                ? 'text-black/75'
                                                : 'text-white/75'
                                            : index === hoveredIndex
                                                ? 'text-black/75'
                                                : 'text-white/75'
                                        }`}>{card.title}</h3>
                                        <h1 className={`flex flex-row items-end gap-2 text-4xl font-semibold my-2 ${hoveredIndex === null
                                            ? index === selectedIndex
                                                ? 'text-black'
                                                : 'text-white'
                                            : index === hoveredIndex
                                                ? 'text-black'
                                                : 'text-white'
                                        }`}>
                                            {card.price}
                                            <p className={`text-base font-normal mb-0.5 ${hoveredIndex === null
                                            ? index === selectedIndex
                                                ? 'text-black/75'
                                                : 'text-white/75'
                                            : index === hoveredIndex
                                                ? 'text-black/75'
                                                : 'text-white/75'
                                        }`}>{card.period}</p>
                                        </h1>
                                        <p className={`font-light ${hoveredIndex === null
                                            ? index === selectedIndex
                                                ? 'text-black/75'
                                                : 'text-white/75'
                                            : index === hoveredIndex
                                                ? 'text-black/75'
                                                : 'text-white/75'
                                        }`}>{card.description}</p>
                                        <div className={`border-t border-dashed my-6 ${hoveredIndex === null
                                            ? index === selectedIndex
                                                ? 'border-black/10'
                                                : 'border-white/10'
                                            : index === hoveredIndex
                                                ? 'border-black/10'
                                                : 'border-white/10'
                                        }`}></div>
                                        <h3 className={`font-medium ${hoveredIndex === null
                                            ? index === selectedIndex
                                                ? 'text-black'
                                                : 'text-white'
                                            : index === hoveredIndex
                                                ? 'text-black'
                                                : 'text-white'
                                        }`}>This Plan Includes:</h3>
                                        {card.features.map((feature, idx) => (
                                            <span key={idx} className={`inline-flex items-center gap-2 my-2 text-sm ${hoveredIndex === null
                                                ? index === selectedIndex
                                                    ? 'text-black/75'
                                                    : 'text-white/75'
                                                : index === hoveredIndex
                                                    ? 'text-black/75'
                                                    : 'text-white/75'
                                            }`}>
                                                <a
                                                    className={`inline-flex justify-center items-center p-1 rounded-full ${hoveredIndex === null
                                                        ? index === selectedIndex
                                                            ? 'text-black bg-black/10'
                                                            : 'text-white bg-white/10'
                                                        : index === hoveredIndex
                                                            ? 'text-black bg-black/10'
                                                            : 'text-white bg-white/10'
                                                    }`}
                                                    href="#"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m4.5 12.75 6 6 9-13.5"
                                                        />
                                                    </svg>
                                                </a>
                                                {feature}
                                            </span>
                                        ))}
                                        <button
                                            className={`btn rounded-2xl mt-4 ${hoveredIndex === null
                                                ? index === selectedIndex
                                                    ? 'border-black bg-black'
                                                    : 'border-white/10 bg-white/15'
                                                : index === hoveredIndex
                                                    ? 'border-black bg-black'
                                                    : 'border-white/10 bg-white/15'
                                            }`}
                                            onClick={() => handleButtonClick(index)}
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Prices;