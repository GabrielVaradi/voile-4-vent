import React from 'react'
import Image from 'next/image'
import styles from '../../../styles/Components/Image.module.scss'

const ImageFull = ({ src, alt, children, ragged, containerClasses }) => {
    return (
        <div className={`${containerClasses} ${styles.imageContainer}`}>
            <Image
                layout="fill"
                objectFit="cover"
                src={src}
                alt={alt}
                className={`${ragged ? styles.ragged : ''}`}
                priority
            />
            {children}
        </div>
    )
}

export default ImageFull
