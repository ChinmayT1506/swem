import React from "react";
import ImageGallery from "react-image-gallery";
import "./carousel.scss"

export default function BasicCarousel() {
    const images = [
        {
            original: "https://picsum.photos/id/237/300/150",
            thumbnail: "https://picsum.photos/id/237/300/150",
            originalHeight: "500vh",
            description: "IMAGE CAPTURED WITH LAT:20.4444 & LONG:LAT:60.316262"
        },
        {
            original: "https://picsum.photos/id/1/300/150",
            thumbnail: "https://picsum.photos/id/1/300/150",
            originalHeight: "500vh"

        },
        {
            original: "https://picsum.photos/id/10/300/150",
            thumbnail: "https://picsum.photos/id/10/300/150",
            originalHeight: "500vh"

        },
        {
            original: "https://picsum.photos/id/100/300/150",
            thumbnail: "https://picsum.photos/id/100/300/150",
            originalHeight: "500vh"

        },
        {
            original: "https://picsum.photos/id/101/300/150",
            thumbnail: "https://picsum.photos/id/101/300/150",
            originalHeight: "500vh"

        },
        {
            original: "https://picsum.photos/id/1000/300/150",
            thumbnail: "https://picsum.photos/id/1000/300/150",
            originalHeight: "500vh"

        },
    ];

    return (
        <>
            <ImageGallery
                items={images}
                showBullets={true}
                showIndex={true}
                showThumbnails={true}
                showFullscreenButton={true}
                useBrowserFullscreen={true}
                lazyLoad={false}
                showPlayButton={true}
                showNav={true}
                thumbnailPosition={"left"}
                slideInterval="2000"
            />
        </>
    );
}