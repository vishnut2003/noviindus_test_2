'use client';

import React, { PropsWithChildren } from 'react'
import { motion } from "framer-motion";

const AuthFieldSlideEffect = ({ children }: PropsWithChildren<{}>) => {
    return (
        <motion.div
            className='w-full h-full'
            initial={{
                x: 100,
                opacity: 0,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
        >
            {children}
        </motion.div>
    )
}

export default AuthFieldSlideEffect