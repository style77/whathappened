import React from 'react';

interface CardProps {
    title: string;
    content: string;
    SvgIcon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Card: React.FC<CardProps> = ({ title, content, SvgIcon }) => {
    return (
        <div className="flex flex-col h-min gap-2 rounded-xl bg-white border p-6">
            <a className="bg-gradient-to-r from-cyan-200 to-cyan-400 shadow-sm w-min p-1.5 mb-5 rounded-lg">
                <SvgIcon className="size-7 text-white" />
            </a>
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="font-light">{content}</p>
        </div>
    );
};

export default Card;
