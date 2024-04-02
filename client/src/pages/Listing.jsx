import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoding(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoding(false);
          setError(false);
          return;
        }

        setListing(data);
        setLoding(false);
      } catch (error) {
        setError(true);
        setLoding(false);
      }
    };
    fetchListing();
  }, []);
  console.log(listing);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong !</p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => {
              console.log(url);

              return (
                <SwiperSlide key={url}>
                  {/* <div
                    className="h-[550px] "
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  >
                    {console.log(url)}
                  </div> */}
                  <img
                    src={url}
                    alt="image"
                    className=" h-[450px] mx-auto w-full object-cover"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default Listing;
