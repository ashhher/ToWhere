import React from "react";
import styles from "./Carousel.module.css";
import { Image, Carousel as AntCarousel } from "antd";

import carouselImage_1 from "../../assets/images/carousel_1.jpg";
import carouselImage_2 from "../../assets/images/carousel_2.jpg";
import carouselImage_3 from "../../assets/images/carousel_3.jpg";

export const Carousel: React.FC = () => {
    return (
        <AntCarousel autoplay className={styles.slider}>
            <Image src={carouselImage_1} />
            <Image src={carouselImage_2} />
            <Image src={carouselImage_3} />
        </AntCarousel>
    )

}