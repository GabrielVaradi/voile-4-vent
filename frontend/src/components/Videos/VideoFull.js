import React from 'react'
import styles from '../../../styles/Components/Video.module.scss'

const VideoFull = ({ src, children, containerClasses }) => {
    return (
        <div className={`${containerClasses} ${styles.videoContainer}`}>
            <video autoPlay muted loop className={styles.videoFooter}>
                <source src={src} type="video/mp4" />
            </video>
            {children}
        </div>
    )
}

export default VideoFull
