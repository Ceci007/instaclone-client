import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function LazyImage({ alt, height, width, src }) {
    return (
        <LazyLoadImage
            alt={alt}
            height={height}
            src={src} 
            width={width} />
    )
}
