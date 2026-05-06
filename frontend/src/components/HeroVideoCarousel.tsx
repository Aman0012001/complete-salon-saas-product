import { useNavigate } from "react-router-dom";

const HeroVideoCarousel = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full h-[500px] md:h-[600px] lg:h-[690px] overflow-hidden bg-[#FAF9F6]">

            {/* Background Videos */}
            <div className="absolute inset-0 z-0 overflow-hidden">

                {/* Desktop Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hidden md:block w-full h-full object-cover object-center scale-105"
                >
                    <source src="/herovideo.MP4" type="video/mp4" />
                </video>

                {/* Mobile Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="block md:hidden w-full h-full object-cover object-center scale-105"
                >
                    <source src="/heromobile.mp4" type="video/mp4" />
                </video>


            </div>



        </section>
    );
};

export default HeroVideoCarousel;