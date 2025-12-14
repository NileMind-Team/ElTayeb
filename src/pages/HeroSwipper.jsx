import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaFire,
  FaTag,
  FaClock,
  FaPercent,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";

const HeroSwipper = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSliderItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(
          "/api/MenuItems/GetAllSliderItems"
        );
        const sliderItems = response.data;

        const formattedSlides = sliderItems.map((item, index) => {
          const colorGradients = [
            "from-[#E41E26]/85 to-[#FDB913]/85",
            "from-[#0f766e]/85 to-[#14b8a6]/85",
            "from-[#7c3aed]/85 to-[#c026d3]/85",
            "from-[#1a1a2e]/85 to-[#16213e]/85",
            "from-[#dc2626]/85 to-[#ea580c]/85",
            "from-[#059669]/85 to-[#10b981]/85",
            "from-[#7c2d12]/85 to-[#c2410c]/85",
          ];

          let discountPrice = item.basePrice;
          let discountValue = 0;
          let discountType = "none";
          let discountText = "";

          if (item.itemOffer && item.itemOffer.isEnabled) {
            if (item.itemOffer.isPercentage) {
              discountPrice =
                item.basePrice * (1 - item.itemOffer.discountValue / 100);
              discountValue = item.itemOffer.discountValue;
              discountType = "percentage";
              discountText = `${discountValue}%`;
            } else {
              discountPrice = item.basePrice - item.itemOffer.discountValue;
              discountValue = item.itemOffer.discountValue;
              discountType = "fixed";
              discountText = `${discountValue} ج.م`;
            }
          }

          const imageUrl = item.imageUrl
            ? `https://restaurant-template.runasp.net/${item.imageUrl}`
            : "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&h=450&fit=crop&crop=center";

          const preparationTime = item.preparationTimeEnd
            ? `${item.preparationTimeStart}-${item.preparationTimeEnd} دقيقة`
            : `${item.preparationTimeStart} دقيقة`;

          return {
            id: item.id,
            title: item.name,
            description: item.description || "وصف غير متوفر",
            image: imageUrl,
            originalPrice: item.basePrice,
            discountPrice: discountPrice,
            discountValue: discountValue,
            discountType: discountType,
            discountText: discountText,
            preparationTime: preparationTime,
            category: item.category?.name || "عام",
            ctaText: "اطلب الآن",
            bgColor: colorGradients[index % colorGradients.length],
            hasOffer: item.itemOffer && item.itemOffer.isEnabled,
            productData: item,
          };
        });

        setSlides(formattedSlides);
      } catch (error) {
        console.error("Error fetching slider items:", error);
        setError("فشل في تحميل العروض الخاصة");

        Swal.fire({
          icon: "error",
          title: "خطأ في التحميل",
          text: "تعذر تحميل العروض الخاصة",
          timer: 2000,
          showConfirmButton: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSliderItems();
  }, []);

  const handleOrderNow = (slide) => {
    navigate(`/product/${slide.id}`, { state: { product: slide.productData } });
  };

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  if (loading) {
    return (
      <div className="relative w-full h-[55vh] min-h-[450px] max-h-[600px] overflow-hidden rounded-b-2xl shadow-xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#E41E26]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-[55vh] min-h-[450px] max-h-[600px] overflشow-hidden rounded-b-2xl shadow-xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-2xl inline-block mb-4">
            <FaFire className="text-red-500 text-4xl mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {error}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            سيتم عرض المنتجات العادية أدناه
          </p>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[55vh] min-h-[450px] max-h-[600px] overflow-hidden rounded-b-2xl shadow-xl bg-gradient-to-r from-[#E41E26]/10 to-[#FDB913]/10 dark:from-[#E41E26]/20 dark:to-[#FDB913]/20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="bg-gradient-to-r from-[#E41E26] to-[#FDB913] p-4 rounded-2xl inline-block mb-4">
            <FaFire className="text-white text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            لا توجد عروض خاصة حالياً
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            تصفح قائمة المنتجات لدينا للعثور على ما تبحث عنه
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[55vh] min-h-[450px] max-h-[600px] overflow-hidden rounded-b-2xl shadow-xl">
      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={slides.length > 1}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-85`}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
                    {/* Left Side - Text Content */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-right lg:text-right order-2 lg:order-1 px-2 mt-[-20px]"
                      dir="rtl"
                    >
                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-md px-2.5 py-1 mb-3">
                        <FaTag className="text-white/80" size={11} />
                        <span className="text-white font-medium text-xs">
                          {slide.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className="text-xs sm:text-sm md:text-base text-white/85 mb-4 leading-relaxed max-w-lg">
                        {slide.description}
                      </p>

                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-md px-2.5 py-1">
                          <FaClock className="text-blue-300" size={12} />
                          <span className="text-white font-medium text-xs">
                            {slide.preparationTime}
                          </span>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="mb-5">
                        <div className="flex items-center gap-3 flex-wrap">
                          {/* Discount Price */}
                          <div className="flex flex-col">
                            <span className="text-white/70 text-xs mb-0.5">
                              السعر النهائي
                            </span>
                            <span className="text-xl sm:text-2xl text-white font-bold">
                              {formatPrice(slide.discountPrice)} ج.م
                            </span>
                          </div>

                          {slide.hasOffer && (
                            <div className="flex flex-col">
                              <span className="text-white/70 text-xs mb-0.5">
                                بدلاً من
                              </span>
                              <span className="text-lg text-white/60 line-through font-semibold">
                                {formatPrice(slide.originalPrice)} ج.م
                              </span>
                            </div>
                          )}

                          {slide.hasOffer && slide.discountType !== "none" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                              className="relative"
                            >
                              <div className="bg-gradient-to-r from-[#E41E26] to-[#FDB913] text-white px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                                {slide.discountType === "percentage" ? (
                                  <FaPercent size={12} />
                                ) : (
                                  <FaMoneyBillWave size={12} />
                                )}
                                <span className="text-base font-bold">
                                  {slide.discountText}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {slide.hasOffer && slide.discountType !== "none" && (
                          <div className="mt-2">
                            <div className="inline-flex items-center gap-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-2.5 py-1 rounded-md">
                              <span className="text-xs font-semibold">وفر</span>
                              <span className="text-sm font-bold">
                                {formatPrice(
                                  slide.originalPrice - slide.discountPrice
                                )}{" "}
                                ج.م
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => handleOrderNow(slide)}
                        className="group relative bg-gradient-to-r from-white to-gray-100 text-gray-900 px-5 py-2.5 rounded-lg font-bold text-sm sm:text-base hover:shadow-lg hover:scale-105 transition-all duration-250 transform flex items-center gap-2 mx-auto lg:mx-0 overflow-hidden"
                        dir="rtl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E41E26] to-[#FDB913] opacity-0 group-hover:opacity-20 transition-opacity duration-250"></div>
                        <span className="relative z-10">{slide.ctaText}</span>
                        <FaShoppingCart
                          className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-250"
                          size={14}
                        />
                      </motion.button>
                    </motion.div>

                    {/* Right Side - Image Preview */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="order-1 lg:order-2 relative px-2 mt-[-20px]"
                    >
                      <div className="relative flex justify-center items-center">
                        {/* Main Image Container */}
                        <div className="relative rounded-xl overflow-hidden shadow-lg border-3 border-white/15 backdrop-blur-sm w-full max-w-md">
                          {/* Image with object-contain */}
                          <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center bg-black/20">
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                          {slide.hasOffer && slide.discountType !== "none" && (
                            <motion.div
                              initial={{ y: 8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.6 }}
                              className="absolute top-2 left-2 bg-gradient-to-r from-[#E41E26] to-[#FDB913] text-white px-2 py-1 rounded-md shadow-md"
                            >
                              <div className="flex items-center gap-1">
                                <FaFire size={10} />
                                <span className="font-bold text-xs">
                                  {slide.discountType === "percentage"
                                    ? `خصم ${slide.discountValue}%`
                                    : `خصم ${slide.discountValue} ج.م`}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {slides.length > 1 && (
        <>
          <button className="swiper-button-prev absolute left-1.5 top-1/2 transform -translate-y-1/2 z-20 bg-white text-[#FDB913] rounded-full p-2.5 sm:p-3 hover:scale-110 transition-all duration-250 shadow-lg hover:shadow-xl">
            <FaChevronLeft size={16} className="sm:w-4" />
          </button>
          <button className="swiper-button-next absolute right-1.5 top-1/2 transform -translate-y-1/2 z-20 bg-white text-[#FDB913] rounded-full p-2.5 sm:p-3 hover:scale-110 transition-all duration-250 shadow-lg hover:shadow-xl">
            <FaChevronRight size={16} className="sm:w-4" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const swiper = document.querySelector(".swiper")?.swiper;
                if (swiper) swiper.slideTo(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </div>
  );
};

export default HeroSwipper;
