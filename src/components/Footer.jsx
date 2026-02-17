import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";
import { PiStarFourFill, PiMoonStarsFill } from "react-icons/pi";
import { GiLanternFlame } from "react-icons/gi";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "فيسبوك",
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/ELTAYP.FYM?rdid=l35IEcDe8nAWRZT7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Acv4CtGSL%2F#",
      color: "hover:bg-blue-600",
    },
    {
      name: "واتساب",
      icon: <FaWhatsapp />,
      url: "https://wa.me/201062485133",
      color: "hover:bg-green-600",
    },
  ];

  const ramadanDecorations = [
    { Icon: GiLanternFlame, delay: 0, top: "5%", right: "10%", size: 24 },
    { Icon: PiMoonStarsFill, delay: 0.3, top: "15%", left: "8%", size: 28 },
    { Icon: PiStarFourFill, delay: 0.6, bottom: "20%", right: "15%", size: 20 },
    { Icon: PiStarFourFill, delay: 0.9, bottom: "10%", left: "12%", size: 16 },
    { Icon: GiLanternFlame, delay: 1.2, top: "25%", left: "20%", size: 20 },
  ];

  return (
    <footer
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-[#1a1a1a] text-white relative overflow-hidden"
      dir="rtl"
    >
      {/* الخلفية الأساسية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-[#5B2703]/10 to-[#8B4513]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#8B4513]/10 to-[#5B2703]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-[#5B2703]/5 to-[#8B4513]/5 rounded-full blur-3xl"></div>

        {/* زينة رمضان - فوانيس ونجوم وهلال متحركة */}
        {ramadanDecorations.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-[#8B4513]/30"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
            }}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <item.Icon size={item.size} />
          </motion.div>
        ))}

        <svg
          className="absolute top-0 left-0 w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="ramadan-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 5 L22 10 L27 10 L23 13 L25 18 L20 15 L15 18 L17 13 L13 10 L18 10 Z"
                fill="none"
                stroke="#8B4513"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#ramadan-pattern)"
          />
        </svg>

        <motion.div
          className="absolute -bottom-10 -left-10 text-[#8B4513]/10"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <PiMoonStarsFill size={120} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 md:col-span-5"
          >
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center gap-3 relative">
                <img
                  src={logo}
                  alt="ElTayeb"
                  className="w-12 h-12 object-contain"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-[#5B2703] to-[#8B4513] bg-clip-text text-transparent">
                  ElTayeb
                </span>
                {/* نجمة رمضانية صغيرة */}
                <motion.div
                  className="absolute -top-2 -right-2 text-[#8B4513]"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <PiStarFourFill size={12} />
                </motion.div>
              </div>
            </Link>

            <p className="text-gray-300 mb-6 leading-relaxed">
              نقدم أشهى الدجاج المقلي والوجبات. جرب مزيجًا مثاليًا من القرمشة
              اللذيذة والنكهات الأصيلة.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <FaPhone className="text-[#8B4513] text-sm" />
                <span className="text-sm" dir="ltr">
                  +20 106 248 5133
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <FaMapMarkerAlt className="text-[#8B4513] text-sm" />
                <span className="text-sm">الفيوم - المحمدية</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-12 md:col-span-5"
          >
            <div className="text-center w-full">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
                <FaClock className="text-[#8B4513]" />
                ساعات العمل
                <PiStarFourFill className="text-[#8B4513] text-xs" />
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300">
                <div className="relative group">
                  <p className="font-semibold text-white">السبت - الأربعاء</p>
                  <p>11:00 ص - 2:00 ص</p>
                  {/* نجمة صغيرة تظهر عند التحويم */}
                  <motion.div
                    className="absolute -top-2 -right-2 text-[#8B4513] opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <PiStarFourFill size={10} />
                  </motion.div>
                </div>

                <div className="relative group">
                  <p className="font-semibold text-white">الخميس</p>
                  <p>11:00 ص - 3:00 ص</p>
                  <motion.div
                    className="absolute -top-2 left-1/2 text-[#8B4513] opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <PiStarFourFill size={10} />
                  </motion.div>
                </div>

                <div className="relative group">
                  <p className="font-semibold text-white">الجمعة</p>
                  <p>12:00 م - 3:00 ص</p>
                  <motion.div
                    className="absolute -bottom-2 -left-2 text-[#8B4513] opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2 }}
                  >
                    <PiStarFourFill size={10} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 md:col-span-2"
          >
            <div className="h-full flex flex-col items-center justify-center">
              <div className="md:hidden mt-8">
                <div className="flex items-center justify-center gap-6">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 bg-gray-700 rounded-2xl flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:shadow-xl border border-gray-600 relative group`}
                      title={social.name}
                    >
                      <span className="text-xl">{social.icon}</span>
                      {/* نجمة رمضانية تظهر عند التحويم */}
                      <motion.div
                        className="absolute -top-1 -right-1 text-[#8B4513] opacity-0 group-hover:opacity-100"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <PiStarFourFill size={8} />
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center justify-center h-full">
                <div className="flex flex-col items-center gap-6 relative">
                  {/* فانوس رمضاني صغير */}
                  <motion.div
                    className="absolute -top-8 text-[#8B4513]"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <GiLanternFlame size={20} />
                  </motion.div>

                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 bg-gray-700 rounded-2xl flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:shadow-xl border border-gray-600 relative group`}
                      title={social.name}
                    >
                      <span className="text-xl">{social.icon}</span>
                      {/* نجوم رمضانية متحركة */}
                      {index === 0 && (
                        <motion.div
                          className="absolute -left-2 -top-2 text-[#8B4513]"
                          animate={{
                            rotate: [0, 180, 360],
                            scale: [0.8, 1, 0.8],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <PiStarFourFill size={8} />
                        </motion.div>
                      )}
                      {index === 1 && (
                        <motion.div
                          className="absolute -right-2 -bottom-2 text-[#8B4513]"
                          animate={{
                            rotate: [0, -180, -360],
                            scale: [0.8, 1, 0.8],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <PiStarFourFill size={8} />
                        </motion.div>
                      )}
                    </motion.a>
                  ))}

                  {/* هلال صغير */}
                  <motion.div
                    className="absolute -bottom-8 text-[#8B4513]"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <PiMoonStarsFill size={18} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700 relative"
        >
          {/* شريط زخرفي رمضاني */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-[#8B4513] rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-gray-400 text-sm text-center flex flex-wrap items-center justify-center gap-2"
              dir="rtl"
            >
              <PiStarFourFill className="text-[#8B4513] text-xs" />©{" "}
              {currentYear} ElTayeb. جميع الحقوق محفوظة. | صنع بواسطة{" "}
              <a
                href="https://wa.me/201062485133"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B4513] font-semibold hover:text-[#5B2703] transition-colors duration-300"
              >
                شركه TripleS للبرمجيات
              </a>
              في مصر — وللتواصل
              <a
                href="https://wa.me/201062485133"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-600 hover:bg-green-500 transition-all duration-300 hover:scale-110"
                title="تواصل واتساب"
              >
                <FaWhatsapp className="text-white text-sm" />
              </a>
              <PiMoonStarsFill className="text-[#8B4513] text-xs" />
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5B2703] via-[#8B4513] to-[#5B2703]"></div>

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8B4513] to-transparent"></div>
    </footer>
  );
};

export default Footer;
