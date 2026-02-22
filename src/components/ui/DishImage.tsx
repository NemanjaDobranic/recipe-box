import {useState} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

interface DishImageProps {
    src?: string;
    alt: string;
    className?: string;
    wrapperClassName?: string;
}

const FALLBACK_IMAGE = "/assets/images/generic-dish.jpg";

export default function DishImage({
                                      src,
                                      alt,
                                      className = "",
                                      wrapperClassName = "",
                                  }: DishImageProps) {
    const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);

    return (
        <div className="transform transition-transform duration-300 hover:scale-105">
            <LazyLoadImage
                src={imgSrc}
                alt={alt}
                effect="blur"
                loading="lazy"
                onError={() => setImgSrc(FALLBACK_IMAGE)}
                className={className}
                wrapperClassName={wrapperClassName}
            />
        </div>
    );
}