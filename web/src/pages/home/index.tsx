import React from "react";
import { ScrollerMotion } from 'scroller-motion'

import Header from "../../components/home/Header";
import Features from "../../components/home/Features";
import Product from "../../components/home/Product";
import Insertion from "../../components/home/Insertion";
import Team from "../../components/home/Team";
import Prices from "../../components/home/Prices";

export const Home: React.FC = () => {
    return (
        <div className="flex flex-col">
            <ScrollerMotion ref={{
                current: '[Circular]'
            }}>
                <Header />
                <Product />
                <Insertion />
                <Features />
                <Team />
                <Prices />
            </ScrollerMotion>
        </div>
    );
};