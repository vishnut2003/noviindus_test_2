import React from 'react'
import { motion } from "framer-motion";

const QuestionDescriptionPopup = ({ content, closePopup }: {
    content: string,
    closePopup: () => void,
}) => {
    return (
        <motion.div
            className='absolute top-0 left-0 w-full h-full z-20 bg-black/40 flex items-center justify-center'
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
        >
            <motion.div
                className="max-w-[800px] w-full p-[30px] bg-white space-y-[25px] rounded-[10px]"
                initial={{
                    scale: 0.9,
                }}
                animate={{
                    scale: 1,
                }}
            >
                <p
                    className='px-[20px] border-b border-gray-200'
                >Comprehensive Paragraph</p>

                <div>
                    <p
                        className='text-[15px]'
                    >{content}</p>
                </div>

                <div
                    className='flex items-center justify-end'
                >
                    <button
                        className='py-[15px] px-[20px] bg-theme-primary text-white rounded-[8px] cursor-pointer'
                        onClick={closePopup}
                    >
                        Minimize
                    </button>
                </div>

            </motion.div>
        </motion.div>
    )
}

export default QuestionDescriptionPopup