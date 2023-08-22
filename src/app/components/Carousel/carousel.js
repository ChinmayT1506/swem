import React from "react";
import ImageGallery from "react-image-gallery";
import "./carousel.scss"

export default function BasicCarousel({ data }) {

    // const newImages = Array.from(
    //     data.map(item => {
    //         return {
    //             original: item.filename,
    //             // thumbnail: key.filename,
    //             originalHeight: "500vh"
    //         }
    //     }))

    const images = [
        {
            original: "https://picsum.photos/id/237/300/150",
            thumbnail: "https://picsum.photos/id/237/300/150",
            originalHeight: "500vh",
            description: `IMAGE CAPTURED WITH LAT:${data[0]?.latitude} & LONG:LAT:${data[0]?.longitude}`
        },
        {
            original: "https://picsum.photos/id/1/300/150",
            thumbnail: "https://picsum.photos/id/1/300/150",
            originalHeight: "500vh",
            description: `IMAGE CAPTURED WITH LAT:${data[1]?.latitude} & LONG:LAT:${data[1]?.longitude}`

        },
        {
            original: "https://picsum.photos/id/10/300/150",
            thumbnail: "https://picsum.photos/id/10/300/150",
            originalHeight: "500vh",
            description: `IMAGE CAPTURED WITH LAT:${data[2]?.latitude} & LONG:LAT:${data[2]?.longitude}`
        },
        {
            original: "https://picsum.photos/id/100/300/150",
            thumbnail: "https://picsum.photos/id/100/300/150",
            originalHeight: "500vh",
            description: `IMAGE CAPTURED WITH LAT:${data[3]?.latitude} & LONG:LAT:${data[3]?.longitude}`
        },
        {
            original: "https://picsum.photos/id/101/300/150",
            thumbnail: "https://picsum.photos/id/101/300/150",
            originalHeight: "500vh",
            description: `IMAGE CAPTURED WITH LAT:${data[4]?.latitude} & LONG:LAT:${data[4]?.longitude}`
        },
        {
            original: "https://picsum.photos/id/1000/300/150",
            thumbnail: "https://picsum.photos/id/1000/300/150",
            originalHeight: "500vh",
            description: `IMAGE CAPTURED WITH LAT:${data[5]?.latitude} & LONG:LAT:${data[5]?.longitude}`
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