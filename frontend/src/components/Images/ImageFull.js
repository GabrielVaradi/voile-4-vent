import React from 'react'
import Image from 'next/image'
import styles from '../../../styles/Components/Image.module.scss'

const ImageFull = ({ src, alt, children, ragged }) => {
    return (
        <div className={styles.imageContainer}>
            <Image
                layout="fill"
                objectFit="cover"
                src={src}
                alt={alt}
                className={`${styles.imageFull} ${ragged ? styles.ragged : ''}`}
            />
            {children}
        </div>
    )
}

export default ImageFull
