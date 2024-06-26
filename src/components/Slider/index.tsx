import {Navigation, A11y} from 'swiper/modules';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';

import slide1 from "@assets/images/slide-1.jpg";
import slide2 from "@assets/images/slide-2.jpg";
import slide3 from "@assets/images/slide-3.jpg";
import slide4 from "@assets/images/slide-4.jpg";
import slide5 from "@assets/images/slide-5.jpg";
import slide6 from "@assets/images/slide-6.jpg";
import slide7 from "@assets/images/slide-7.jpg";
import slide8 from "@assets/images/slide-8.jpg";
import slide9 from "@assets/images/slide-9.jpg";
import slide10 from "@assets/images/slide-10.jpg";
import slide11 from "@assets/images/slide-11.jpg";
import IconArrow from "@assets/icons/icon-arrow.svg?react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const slides = [
    {
        imageSrc: slide1.src,
    },
    {
        imageSrc: slide3.src,
    },
    {
        imageSrc: slide4.src,
    },
    {
        imageSrc: slide5.src,
    },
    {
        imageSrc: slide6.src,
    },
    {
        imageSrc: slide7.src,
    },
    {
        imageSrc: slide8.src,
    },
    {
        imageSrc: slide9.src,
    },
    {
        imageSrc: slide10.src,
    },
    {
        imageSrc: slide11.src,
    },
];

function Slider() {
    const swiper = useSwiper();

    const handleNext = () => {
        swiper.slideNext();
    }
    const handlePrev = () => {
        swiper.slidePrev();
    }

    return (
        <div className="h-58 relative">
            <div className="md:px-14 h-full">
                <Swiper
                    className="h-full rounded-2xl overflow-hidden"
                    modules={[Navigation, A11y]}
                    loop
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}

                >
                    {
                        slides.map((slide, index) => (
                            <SwiperSlide
                                className="rounded-2xl overflow-hidden"
                                key={index}
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={slide.imageSrc}
                                    alt={`slide-${index}`}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>


            <div className="absolute top-1/2 -translate-y-1/2 z-20 w-full flex justify-between">
                <button className="p-2 size-9 rounded-full bg-neutral-200 swiper-button-prev">
                    <IconArrow/>
                </button>

                <button className="p-2 size-9 rounded-full bg-neutral-200 swiper-button-next">
                    <IconArrow className="rotate-180"/>
                </button>
            </div>
        </div>
    );
};

export default Slider;
