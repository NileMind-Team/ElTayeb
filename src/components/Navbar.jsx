import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaStar,
  FaShoppingCart,
  FaClipboardList,
  FaTimes,
  FaUsers,
  FaUserShield,
  FaBuilding,
  FaMoon,
  FaSun,
  FaMoneyBillWave,
  FaCity,
  FaStore,
  FaCodeBranch,
  FaUserCircle,
  FaHeart,
  FaMap,
  FaPercent,
  FaChartBar,
  FaArrowLeft,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { PiStarFourFill, PiMoonStarsFill } from "react-icons/pi";
import { GiLanternFlame } from "react-icons/gi";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import logo from "../assets/logo.png";
import logoDark from "../assets/logo.png";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState([]);
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  // زينة رمضان المتحركة
  const ramadanDecorations = [
    { Icon: GiLanternFlame, delay: 0, top: "10%", right: "20%", size: 20 },
    { Icon: PiMoonStarsFill, delay: 0.3, top: "60%", left: "15%", size: 22 },
    { Icon: PiStarFourFill, delay: 0.6, bottom: "20%", right: "25%", size: 16 },
    { Icon: PiStarFourFill, delay: 0.9, top: "40%", left: "25%", size: 14 },
    { Icon: GiLanternFlame, delay: 1.2, bottom: "30%", left: "10%", size: 18 },
    { Icon: PiMoonStarsFill, delay: 1.5, top: "75%", right: "15%", size: 20 },
    { Icon: PiStarFourFill, delay: 1.8, top: "25%", right: "10%", size: 12 },
  ];

  const ramadanGarland = [
    { Icon: GiLanternFlame, delay: 0, size: 14, rotate: -5 },
    { Icon: PiStarFourFill, delay: 0.2, size: 10, rotate: 10 },
    { Icon: PiMoonStarsFill, delay: 0.4, size: 16, rotate: 0 },
    { Icon: GiLanternFlame, delay: 0.6, size: 12, rotate: 8 },
    { Icon: PiStarFourFill, delay: 0.8, size: 8, rotate: -10 },
    { Icon: PiMoonStarsFill, delay: 1.0, size: 14, rotate: 5 },
    { Icon: GiLanternFlame, delay: 1.2, size: 10, rotate: -8 },
    { Icon: PiStarFourFill, delay: 1.4, size: 12, rotate: 12 },
    { Icon: GiLanternFlame, delay: 1.6, size: 16, rotate: -5 },
    { Icon: PiMoonStarsFill, delay: 1.8, size: 12, rotate: 7 },
    { Icon: PiStarFourFill, delay: 2.0, size: 10, rotate: -12 },
    { Icon: GiLanternFlame, delay: 2.2, size: 14, rotate: 5 },
  ];

  const authLinks = [
    { path: "/login", label: "تسجيل الدخول" },
    { path: "/register", label: "إنشاء حساب" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const handleAuthClick = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  const handleProfileClick = () => {
    setIsSidebarOpen(false);
    navigate("/profile");
  };

  const handleAddressesClick = () => {
    setIsSidebarOpen(false);
    navigate("/addresses");
  };

  const handleReviewsClick = () => {
    setIsSidebarOpen(false);
    navigate("/reviews");
  };

  const handleOrdersClick = () => {
    setIsSidebarOpen(false);
    navigate("/my-orders");
  };

  const handleCartClick = () => {
    setIsSidebarOpen(false);
    navigate("/cart");
  };

  const handleFavoritesClick = () => {
    setIsSidebarOpen(false);
    navigate("/favorites");
  };

  const handleHomeClick = () => {
    setIsSidebarOpen(false);
    navigate("/");
  };

  const handleBranchesClick = () => {
    setIsSidebarOpen(false);
    navigate("/branches");
  };

  const handleAdminUsersClick = () => {
    setIsSidebarOpen(false);
    navigate("/admin/users");
  };

  const handleAdminBranchesClick = () => {
    setIsSidebarOpen(false);
    navigate("/admin/branches");
  };

  const handleDeliveryCostClick = () => {
    setIsSidebarOpen(false);
    navigate("/admin/delivery-cost");
  };

  const handleCitiesClick = () => {
    setIsSidebarOpen(false);
    navigate("/admin/cities");
  };

  const handleItemOffersClick = () => {
    setIsSidebarOpen(false);
    navigate("/admin/item-offers");
  };

  const handleReportsClick = () => {
    setIsSidebarOpen(false);
    navigate("/admin/reports");
  };

  const handleTimeDateReportsClick = () => {
    setIsSidebarOpen(false);
    navigate("/admin/time-date-reports");
  };

  const handleOrderShiftsClick = () => {
    setIsSidebarOpen(false);
    navigate("/order-shifts");
  };

  const handleAdminOrderShiftsClick = () => {
    setIsSidebarOpen(false);
    navigate("/admin/order-shifts");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/Account/Profile");
        if (res.status === 200) {
          const fixedImageUrl = res.data.imageUrl
            ? `https://restaurant-template.runasp.net/${res.data.imageUrl}`
            : null;

          const userDataWithAvatar = { ...res.data, avatar: fixedImageUrl };
          setUser(userDataWithAvatar);

          const roles = res.data.roles || [];
          setUserRoles(roles);

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userDataWithAvatar,
              roles: roles,
            }),
          );
        }
      } catch (err) {
        console.error("فشل في جلب الملف الشخصي", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [isLoggedIn]);

  const getInitial = (name) => (!name ? "?" : name.charAt(0).toUpperCase());

  const hasRole = (role) => userRoles.includes(role);

  const hasAnyRole = (roles) => roles.some((role) => userRoles.includes(role));

  const getAdminMenuItems = () => {
    const items = [];

    if (hasRole("Admin")) {
      items.push(
        {
          onClick: handleAdminUsersClick,
          icon: FaUsers,
          label: "إدارة المستخدمين",
          color: "#5B2703",
        },
        {
          onClick: handleAdminBranchesClick,
          icon: FaBuilding,
          label: "إدارة الفروع",
          color: "#5B2703",
        },
        {
          onClick: handleDeliveryCostClick,
          icon: FaMoneyBillWave,
          label: "تكاليف التوصيل",
          color: "#5B2703",
        },
        {
          onClick: handleItemOffersClick,
          icon: FaPercent,
          label: "إدارة الخصومات",
          color: "#5B2703",
        },
        {
          onClick: handleCitiesClick,
          icon: FaCity,
          label: "إدارة المدن",
          color: "#5B2703",
        },
        {
          onClick: handleReportsClick,
          icon: FaChartBar,
          label: "تقارير المبيعات",
          color: "#5B2703",
        },
        {
          onClick: handleTimeDateReportsClick,
          icon: FaCalendarAlt,
          label: "تقارير المبيعات بالوقت والتاريخ",
          color: "#5B2703",
        },
        {
          onClick: handleAdminOrderShiftsClick,
          icon: FaClock,
          label: "تقارير الورديات",
          color: "#5B2703",
        },
      );
    }

    if (hasRole("Restaurant")) {
      const restaurantItems = [
        {
          onClick: handleAdminUsersClick,
          icon: FaUsers,
          label: "إدارة المستخدمين",
          color: "#5B2703",
        },
        {
          onClick: handleDeliveryCostClick,
          icon: FaMoneyBillWave,
          label: "تكاليف التوصيل",
          color: "#5B2703",
        },
        {
          onClick: handleItemOffersClick,
          icon: FaPercent,
          label: "إدارة الخصومات",
          color: "#5B2703",
        },
        {
          onClick: handleCitiesClick,
          icon: FaCity,
          label: "إدارة المدن",
          color: "#5B2703",
        },
        {
          onClick: handleReportsClick,
          icon: FaChartBar,
          label: "تقارير المبيعات",
          color: "#5B2703",
        },
        {
          onClick: handleTimeDateReportsClick,
          icon: FaCalendarAlt,
          label: "تقارير الوقت والتاريخ",
          color: "#5B2703",
        },
        {
          onClick: handleAdminOrderShiftsClick,
          icon: FaClock,
          label: "تقارير الورديات",
          color: "#5B2703",
        },
      ];

      restaurantItems.forEach((item) => {
        if (!items.some((existingItem) => existingItem.label === item.label)) {
          items.push(item);
        }
      });
    }

    return items;
  };

  const adminMenuItems = getAdminMenuItems();
  const hasAdminAccess = hasAnyRole(["Admin", "Restaurant"]);
  const hasOrderShiftsAccess = hasAnyRole(["Admin", "Restaurant", "Branch"]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-[#fdf3e8] to-[#f5e1d0] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#5B2703]"></div>
      </div>
    );
  }

  return (
    <>
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg py-4 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50 border-b border-[#5B2703]/20 dark:border-gray-700 transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#5B2703]/5 to-[#8B4513]/5 dark:from-[#8B4513]/10 dark:to-[#5B2703]/10"></div>

          {ramadanDecorations.map((item, index) => (
            <motion.div
              key={index}
              className="absolute text-[#8B4513]/30 dark:text-[#8B4513]/40"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
              }}
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
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
            className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="ramadan-nav-pattern"
                x="0"
                y="0"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M15 3 L17 10 L23 10 L18 14 L21 21 L15 17 L9 21 L12 14 L7 10 L13 10 Z"
                  fill="none"
                  stroke="#8B4513"
                  strokeWidth="0.3"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#ramadan-nav-pattern)"
            />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group relative"
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
            aria-label="الرجوع إلى الصفحة الرئيسية"
            title="الرجوع إلى الصفحة الرئيسية"
          >
            <motion.div
              className="absolute -top-3 -right-3 text-[#8B4513] dark:text-[#8B4513] z-20"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <PiStarFourFill size={14} />
            </motion.div>

            {/* Logo Container */}
            <div className="relative">
              <img
                src={darkMode ? logoDark : logo}
                alt="ElTayeb logo"
                className="w-14 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />

              <motion.div
                className="absolute -bottom-2 -left-2 text-[#8B4513] dark:text-[#8B4513] opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <GiLanternFlame size={12} />
              </motion.div>

              {/* Home Icon on Small Screens - Inside Logo */}
              <div className="md:hidden absolute -top-1 -right-1 bg-[#5B2703] dark:bg-[#8B4513] rounded-full p-1 border-2 border-white dark:border-gray-900 shadow-sm">
                <FaHome className="text-white text-xs" />
              </div>
            </div>

            <div className="flex flex-col items-start">
              {/* Title and Icon for Medium+ Screens */}
              <div className="flex items-center gap-2">
                <h1 className="hidden md:block text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#5B2703] to-[#8B4513] bg-clip-text text-transparent dark:from-[#8B4513] dark:to-[#5B2703] transition-all duration-300 group-hover:from-[#8B4513] group-hover:to-[#5B2703] dark:group-hover:from-[#5B2703] dark:group-hover:to-[#8B4513]">
                  ElTayeb
                </h1>

                {/* Home Icon for Medium+ Screens */}
                <FaHome className="hidden md:block text-[#5B2703] dark:text-[#8B4513] text-sm transition-all duration-300 group-hover:text-[#8B4513] dark:group-hover:text-[#5B2703]" />
              </div>

              {/* Home Indicator Text - All Screens */}
              <div className="flex items-center gap-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1 transition-all duration-300 group-hover:text-[#5B2703] dark:group-hover:text-[#8B4513]">
                  {/* Show Arrow on Small Screens, Home Icon on Medium+ */}
                  <span className="md:hidden flex items-center gap-1">
                    <FaArrowLeft className="text-[10px]" />
                    <span className="ml-1">الرئيسية</span>
                  </span>

                  {/* Full Text on Medium+ Screens */}
                  <span className="hidden md:flex items-center gap-1">
                    <FaArrowLeft className="text-[10px]" />
                    <span>الصفحة الرئيسية</span>
                  </span>
                </p>
              </div>
            </div>

            {/* Hover Effect Ring - Only for Medium+ Screens */}
            <div className="hidden md:block absolute inset-0 -m-2 rounded-2xl bg-gradient-to-r from-[#5B2703] to-[#8B4513] pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </Link>
        </motion.div>

        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[40%] md:w-[45%] lg:w-[50%] pointer-events-none">
          <div className="relative flex justify-center items-center gap-1 md:gap-2">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B4513]/40 to-transparent -translate-y-3"></div>

            <div className="flex justify-around items-center w-full gap-0.5 md:gap-1">
              {ramadanGarland.map((item, index) => (
                <motion.div
                  key={`garland-${index}`}
                  className="text-[#8B4513]/50 dark:text-[#8B4513]/60 hover:text-[#8B4513] dark:hover:text-[#8B4513] transition-colors duration-300"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    y: [-2, 2, -2],
                    rotate: [item.rotate - 2, item.rotate + 2, item.rotate - 2],
                  }}
                  transition={{
                    duration: 3,
                    delay: item.delay,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <item.Icon size={item.size} />
                </motion.div>
              ))}
            </div>

            {/* حبل الزينة السفلي */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent translate-y-3"></div>

            {/* زوائد تزيينية على الحبل */}
            <motion.div
              className="absolute -top-1 left-0 w-1 h-1 rounded-full bg-[#8B4513]/30"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -top-1 right-0 w-1 h-1 rounded-full bg-[#8B4513]/30"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <motion.div
            className="absolute -top-2 -left-2 text-[#8B4513]/50 dark:text-[#8B4513]/60"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <PiMoonStarsFill size={12} />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2.5 bg-gradient-to-r from-[#fdf3e8] to-[#f5e1d0] dark:from-gray-800 dark:to-gray-700 rounded-xl border border-[#8B4513]/30 dark:border-gray-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            aria-label={
              darkMode
                ? "التبديل إلى الوضع النهاري"
                : "التبديل إلى الوضع الليلي"
            }
          >
            {darkMode ? (
              <FaSun className="text-yellow-500 text-lg" />
            ) : (
              <FaMoon className="text-gray-700 text-lg" />
            )}
          </motion.button>

          {isLoggedIn ? (
            <motion.div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsSidebarOpen(true)}
            >
              {/* نجمة رمضانية تظهر عند التحويم */}
              <motion.div
                className="absolute -top-2 -right-2 text-[#8B4513] dark:text-[#8B4513] opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PiStarFourFill size={10} />
              </motion.div>

              <div className="flex items-center gap-2 bg-gradient-to-r from-[#fdf3e8] to-[#f5e1d0] dark:from-gray-800 dark:to-gray-700 px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-[#8B4513]/30 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="صورة المستخدم"
                    className="w-8 h-8 rounded-full object-cover border border-[#8B4513]/50 dark:border-gray-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#5B2703] text-white flex items-center justify-center font-semibold border border-[#8B4513]/50 dark:border-gray-500">
                    {getInitial(userData.firstName)}
                  </div>
                )}
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  {userData.firstName || "مستخدم"}
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <motion.div
                className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {/* فانوس رمضاني صغير يظهر عند التحويم */}
                <motion.div
                  className="absolute -top-3 -left-3 text-[#8B4513] dark:text-[#8B4513] opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <GiLanternFlame size={14} />
                </motion.div>

                <div className="flex items-center gap-2 bg-gradient-to-r from-[#5B2703] to-[#8B4513] px-4 sm:px-6 py-2.5 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-[#5B2703]/25 transition-all duration-300">
                  <span>ابدأ الآن</span>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronDown className="text-white text-sm" />
                  </motion.div>
                </div>
              </motion.div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-64 sm:w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-[#5B2703]/20 dark:border-gray-600 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        {/* زينة رمضانية صغيرة داخل القائمة المنسدلة */}
                        <motion.div
                          className="absolute -top-1 -right-1 text-[#8B4513]/30"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <PiStarFourFill size={12} />
                        </motion.div>
                        <p
                          className="text-sm text-gray-600 dark:text-gray-400 text-right"
                          dir="rtl"
                        >
                          انضم إلى{" "}
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            ElTayeb
                          </span>
                        </p>
                        <p
                          className="font-semibold text-gray-800 dark:text-gray-200 text-right"
                          dir="rtl"
                        >
                          ابدأ رحلتك
                        </p>
                      </div>

                      {authLinks.map((link) => (
                        <motion.div
                          key={link.path}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => handleAuthClick(link.path)}
                            className={`w-full text-right flex items-center justify-between gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-lg ${
                              location.pathname === link.path
                                ? "bg-gradient-to-r from-[#fdf3e8] to-[#f5e1d0] dark:from-gray-700 dark:to-gray-600 text-[#5B2703] dark:text-[#8B4513]"
                                : ""
                            }`}
                            dir="rtl"
                          >
                            <span>{link.label}</span>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* شريط علوي رمضاني رفيع */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8B4513] to-transparent"></div>

        {/* شريط سفلي رمضاني رفيع */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8B4513]/50 to-transparent"></div>
      </nav>

      <AnimatePresence>
        {isLoggedIn && isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-[60]"
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.div
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed top-0 right-0 h-full w-full max-w-xs bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-l border-[#5B2703]/20 dark:border-gray-700 z-[70] overflow-y-auto transition-colors duration-300"
            >
              {/* إضافة زينة رمضانية في السايد بار */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-10 left-5 text-[#8B4513]/10 dark:text-[#8B4513]/20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <PiMoonStarsFill size={40} />
                </motion.div>
                <motion.div
                  className="absolute bottom-20 right-5 text-[#8B4513]/10 dark:text-[#8B4513]/20"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <GiLanternFlame size={30} />
                </motion.div>
                <motion.div
                  className="absolute top-40 right-10 text-[#8B4513]/10 dark:text-[#8B4513]/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <PiStarFourFill size={20} />
                </motion.div>
              </div>

              <div className="relative p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-[#fdf3e8] to-[#f5e1d0] dark:from-gray-800 dark:to-gray-700">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 absolute top-3 right-3 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded-full transition-colors duration-200"
                >
                  <FaTimes className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                </motion.button>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {userData.avatar ? (
                      <img
                        src={userData.avatar}
                        alt="صورة المستخدم"
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#8B4513] dark:border-[#5B2703]"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#5B2703] text-white flex items-center justify-center font-semibold text-lg border-2 border-[#8B4513] dark:border-[#5B2703]">
                        {getInitial(userData.firstName)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 dark:text-gray-200 text-lg truncate">
                        {userData.firstName} {userData.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {userData.email}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {hasRole("Admin") && (
                          <div
                            className="flex flex-row items-center gap-1 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 px-2 py-1 rounded-full"
                            dir="rtl"
                          >
                            <FaUserShield className="text-[#5B2703] dark:text-[#8B4513] text-xs" />
                            <span className="text-xs text-[#5B2703] dark:text-[#8B4513] font-semibold truncate">
                              مدير
                            </span>
                          </div>
                        )}

                        {hasRole("Restaurant") && (
                          <div
                            className="flex flex-row items-center gap-1 bg-green-500/10 dark:bg-green-500/20 px-2 py-1 rounded-full"
                            dir="rtl"
                          >
                            <FaStore className="text-green-600 dark:text-green-400 text-xs" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-semibold truncate">
                              مطعم
                            </span>
                          </div>
                        )}

                        {hasRole("Branch") && (
                          <div
                            className="flex flex-row items-center gap-1 bg-blue-500/10 dark:bg-blue-500/20 px-2 py-1 rounded-full"
                            dir="rtl"
                          >
                            <FaCodeBranch className="text-blue-600 dark:text-blue-400 text-xs" />
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold truncate">
                              فرع
                            </span>
                          </div>
                        )}

                        {hasRole("User") && (
                          <div
                            className="flex flex-row items-center gap-1 bg-purple-500/10 dark:bg-purple-500/20 px-2 py-1 rounded-full"
                            dir="rtl"
                          >
                            <FaUserCircle className="text-purple-600 dark:text-purple-400 text-xs" />
                            <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold truncate">
                              مستخدم
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative p-4">
                <div className="space-y-1">
                  <motion.div
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={handleHomeClick}
                      className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#8B4513]/30 dark:hover:border-gray-500"
                      dir="rtl"
                    >
                      <div className="flex-shrink-0 p-2 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 rounded-lg">
                        <FaHome className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                      </div>
                      <span className="text-lg truncate">الصفحة الرئيسية</span>
                    </button>
                  </motion.div>

                  {hasAdminAccess && adminMenuItems.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 mb-2 text-right truncate">
                        {hasRole("Admin") ? "لوحة الإدارة" : "إدارة المطعم"}
                      </p>

                      {adminMenuItems.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02, x: -4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={item.onClick}
                            className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#8B4513]/30 dark:hover:border-gray-500"
                            dir="rtl"
                          >
                            <div
                              className="flex-shrink-0 p-2 rounded-lg"
                              style={{
                                backgroundColor: `${item.color}10`,
                                color: item.color,
                              }}
                            >
                              <item.icon className="text-lg" />
                            </div>
                            <span className="text-lg truncate">
                              {item.label}
                            </span>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {hasOrderShiftsAccess && (
                    <motion.div
                      whileHover={{ scale: 1.02, x: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={handleOrderShiftsClick}
                        className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#8B4513]/30 dark:hover:border-gray-500"
                        dir="rtl"
                      >
                        <div className="flex-shrink-0 p-2 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 rounded-lg">
                          <FaClock className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                        </div>
                        <span className="text-lg truncate">الورديات</span>
                      </button>
                    </motion.div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={handleProfileClick}
                      className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#8B4513]/30 dark:hover:border-gray-500"
                      dir="rtl"
                    >
                      <div className="flex-shrink-0 p-2 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 rounded-lg">
                        <FaUser className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                      </div>
                      <span className="text-lg truncate">ملفي الشخصي</span>
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={handleOrdersClick}
                      className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#8B4513]/30 dark:hover:border-gray-500"
                      dir="rtl"
                    >
                      <div className="flex-shrink-0 p-2 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 rounded-lg">
                        <FaClipboardList className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                      </div>
                      <span className="text-lg truncate">طلباتي</span>
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={handleCartClick}
                      className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#8B4513]/30 dark:hover:border-gray-500"
                      dir="rtl"
                    >
                      <div className="flex-shrink-0 p-2 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 rounded-lg">
                        <FaShoppingCart className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                      </div>
                      <span className="text-lg truncate">عربة التسوق</span>
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={handleFavoritesClick}
                      className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#8B4513]/30 dark:hover:border-gray-500"
                      dir="rtl"
                    >
                      <div className="flex-shrink-0 p-2 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 rounded-lg">
                        <FaHeart className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                      </div>
                      <span className="text-lg truncate">المفضلة</span>
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={handleAddressesClick}
                      className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#8B4513]/30 dark:hover:border-gray-500"
                      dir="rtl"
                    >
                      <div className="flex-shrink-0 p-2 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 rounded-lg">
                        <FaMapMarkerAlt className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                      </div>
                      <span className="text-lg truncate">عناويني</span>
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={handleReviewsClick}
                      className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#8B4513]/30 dark:hover:border-gray-500"
                      dir="rtl"
                    >
                      <div className="flex-shrink-0 p-2 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 rounded-lg">
                        <FaStar className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                      </div>
                      <span className="text-lg truncate">تقييماتي</span>
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={handleBranchesClick}
                      className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#fdf3e8] hover:to-[#f5e1d0] dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#8B4513]/30 dark:hover:border-gray-500"
                      dir="rtl"
                    >
                      <div className="flex-shrink-0 p-2 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 rounded-lg">
                        <FaMap className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                      </div>
                      <span className="text-lg truncate">فروعنا</span>
                    </button>
                  </motion.div>

                  <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                    <motion.div
                      whileHover={{ scale: 1.02, x: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={handleLogout}
                        className="w-full text-right flex items-center gap-4 px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-[#5B2703] dark:hover:text-[#8B4513] transition-all duration-200 font-medium rounded-xl border border-transparent hover:border-[#5B2703]/30 dark:hover:border-[#8B4513]/30"
                        dir="rtl"
                      >
                        <div className="flex-shrink-0 p-2 bg-[#5B2703]/10 dark:bg-[#8B4513]/20 rounded-lg">
                          <FaSignOutAlt className="text-[#5B2703] dark:text-[#8B4513] text-lg" />
                        </div>
                        <span className="text-lg truncate">تسجيل الخروج</span>
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
