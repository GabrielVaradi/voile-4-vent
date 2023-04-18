import React from 'react'
import Image from "next/legacy/image"
import styles from '../../../styles/Components/Image.module.scss'

const ImageFull = ({ src, alt, children, containerClasses }) => {
    return (
        <div className={`${containerClasses} ${styles.imageContainer}`}>
            <Image
                layout="fill"
                objectFit="cover"
                src={src}
                alt={alt}
                priority
            />
            {children}
        </div>
    )
}

export default ImageFull
