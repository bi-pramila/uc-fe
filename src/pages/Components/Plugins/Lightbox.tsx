import React, { useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import Lightbox from "yet-another-react-lightbox";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Images
import image2 from "assets/images/small/img-2.jpg";
import image3 from "assets/images/small/img-3.jpg";
import image4 from "assets/images/small/img-4.jpg";
import image5 from "assets/images/small/img-5.jpg";
import image7 from "assets/images/small/img-7.jpg";
import image8 from "assets/images/small/img-8.jpg";
import image9 from "assets/images/small/img-9.jpg";
import image10 from "assets/images/small/img-10.jpg";

const PLightBox = () => {

     // State for each gallery section
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    
    const [descriptionOpen, setDescriptionOpen] = useState(false);
    const [descriptionIndex, setDescriptionIndex] = useState(0);
    
    const [videoOpen, setVideoOpen] = useState(false);
    const [videoIndex, setVideoIndex] = useState(0);


     // Image gallery slides
    const galleryImages = [
        { src: image2 },
        { src: image3 },
        { src: image4 },
        { src: image5 },
    ];

    // Images with descriptions
    const descriptionImages = [
        { src: image10, description: "Image 10 description" },
        { src: image9, description: "Image 9 description" },
        { src: image8, description: "Image 8 description" },
        { src: image7, description: "Image 7 description" },
    ];

    // Video gallery slides
    const videoSlides = [
        { 
            type: "video" as const,
            sources: [{ src: "https://www.youtube.com/watch?v=qYgogv4R8zg", type: "video/youtube" }],
            poster: "https://i.ytimg.com/vi/qYgogv4R8zg/hqdefault.jpg"
        },
        { 
            type: "video" as const,
            sources: [{ src: "https://www.youtube.com/watch?v=waoOK5s9ypc", type: "video/youtube" }],
            poster: "https://i.ytimg.com/vi/waoOK5s9ypc/hqdefault.jpg"
        },
        { 
            type: "video" as const,
            sources: [{ src: "https://www.youtube.com/watch?v=waoOK5s9ypc", type: "video/youtube" }],
            poster: "https://i.ytimg.com/vi/waoOK5s9ypc/hqdefault.jpg"
        },
        { 
            type: "video" as const,
            sources: [{ src: "https://www.youtube.com/watch?v=TrftauE2Vyk", type: "video/youtube" }],
            poster: "https://i.ytimg.com/vi/TrftauE2Vyk/hqdefault.jpg"
        },
    ];




    return (
        <React.Fragment>
            <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
                <BreadCrumb title="Lightbox" pageTitle="Plugins" />
                <div>
                    <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-1">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="mb-4 text-15">Simple Image Gallery</h6>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                                    {galleryImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image.src}
                                            alt={`Gallery ${index + 1}`}
                                            className="rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => {
                                                setGalleryIndex(index);
                                                setGalleryOpen(true);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h6 className="mb-4 text-15">Images with Description</h6>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                                    {descriptionImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image.src}
                                            alt={`Description ${index + 1}`}
                                            className="rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => {
                                                setDescriptionIndex(index);
                                                setDescriptionOpen(true);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h6 className="mb-4 text-15">Videos Gallery</h6>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                                    {videoSlides.map((video, index) => (
                                        <img
                                            key={index}
                                            src={video.poster}
                                            alt={`Video ${index + 1}`}
                                            className="object-cover w-full rounded-md h-30 cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => {
                                                setVideoIndex(index);
                                                setVideoOpen(true);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* Lightbox for Simple Gallery */}
                <Lightbox
                    open={galleryOpen}
                    close={() => setGalleryOpen(false)}
                    slides={galleryImages}
                    index={galleryIndex}
                    plugins={[Slideshow, Thumbnails]}
                />

                {/* Lightbox for Images with Description */}
                <Lightbox
                    open={descriptionOpen}
                    close={() => setDescriptionOpen(false)}
                    slides={descriptionImages}
                    index={descriptionIndex}
                    plugins={[Slideshow, Thumbnails]}
                />

                {/* Lightbox for Videos */}
                <Lightbox
                    open={videoOpen}
                    close={() => setVideoOpen(false)}
                    slides={videoSlides}
                    index={videoIndex}
                    plugins={[Video, Slideshow]}
                />
            </div>
        </React.Fragment>
    );
}

export default PLightBox;