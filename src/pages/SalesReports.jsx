import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaChartBar,
  FaSortAmountDown,
  FaSortAmountUp,
  FaDollarSign,
  FaShoppingCart,
  FaTruck,
  FaStore,
  FaPrint,
  FaFilter,
  FaListAlt,
  FaTable,
} from "react-icons/fa";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const generateMockReportData = (startDate, endDate) => {
  if (!startDate || !endDate) return [];

  const mockOrders = [];
  const products = [
    "دجاج مشوي",
    "برجر دجاج",
    "ساندوتش دجاج",
    "بطاطس مقلية",
    "كولا",
    "مايونيز",
    "شاورما دجاج",
    "أجنحة دجاج",
    "سلطة خضار",
    "بيتزا دجاج",
  ];

  const customers = [
    "أحمد محمد",
    "سارة علي",
    "محمود حسن",
    "فاطمة إبراهيم",
    "خالد عبدالله",
    "نورا سعيد",
    "يوسف كمال",
    "ليلى مصطفى",
    "عمر رضا",
    "هبة شريف",
  ];

  const cities = ["القاهرة", "الجيزة", "الإسكندرية", "المنصورة", "طنطا"];

  const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  const days = Math.max(daysDiff, 1);

  for (let i = 0; i < 50; i++) {
    const randomDays = Math.floor(Math.random() * days);
    const orderDate = new Date(startDate);
    orderDate.setDate(orderDate.getDate() + randomDays);

    const orderId = 1000 + Math.floor(Math.random() * 9000);
    const numItems = Math.floor(Math.random() * 5) + 1;

    let orderTotal = 0;
    const orderItems = [];

    for (let j = 0; j < numItems; j++) {
      const productIndex = Math.floor(Math.random() * products.length);
      const quantity = Math.floor(Math.random() * 3) + 1;
      const unitPrice = Math.floor(Math.random() * 100) + 20;
      const totalPrice = quantity * unitPrice;

      orderTotal += totalPrice;

      orderItems.push({
        orderId: orderId,
        orderDate: orderDate,
        dateTime: format(orderDate, "yyyy-MM-dd HH:mm"),
        productName: products[productIndex],
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        orderTotal: orderTotal,
        orderType: Math.random() > 0.5 ? "Delivery" : "Pickup",
        customerName: customers[Math.floor(Math.random() * customers.length)],
        status: Math.random() > 0.8 ? "قيد التنفيذ" : "مكتمل",
        city: cities[Math.floor(Math.random() * cities.length)],
      });
    }

    mockOrders.push(...orderItems);
  }

  return mockOrders;
};

const calculateSummary = (data, startDate, endDate) => {
  if (!data || data.length === 0) {
    return {
      totalSales: 0,
      totalOrders: 0,
      deliveryOrders: 0,
      pickupOrders: 0,
      averageOrderValue: 0,
      topProducts: [],
      dateRange:
        startDate && endDate
          ? `${format(startDate, "yyyy-MM-dd")} إلى ${format(
              endDate,
              "yyyy-MM-dd"
            )}`
          : "لم يتم تحديد فترة",
    };
  }

  const totalSales = data.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalOrders = [...new Set(data.map((item) => item.orderId))].length;
  const deliveryOrders = data.filter(
    (item) => item.orderType === "Delivery"
  ).length;
  const pickupOrders = data.filter(
    (item) => item.orderType === "Pickup"
  ).length;

  const productSales = {};
  data.forEach((item) => {
    if (!productSales[item.productName]) {
      productSales[item.productName] = {
        quantity: 0,
        revenue: 0,
      };
    }
    productSales[item.productName].quantity += item.quantity;
    productSales[item.productName].revenue += item.totalPrice;
  });

  const topProducts = Object.entries(productSales)
    .map(([name, data]) => ({
      name,
      quantity: data.quantity,
      revenue: data.revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return {
    totalSales,
    totalOrders,
    deliveryOrders,
    pickupOrders,
    averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0,
    topProducts,
    dateRange:
      startDate && endDate
        ? `${format(startDate, "yyyy-MM-dd")} إلى ${format(
            endDate,
            "yyyy-MM-dd"
          )}`
        : "لم يتم تحديد فترة",
  };
};

const SalesReports = () => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "orderDate",
    direction: "desc",
  });
  const [selectedView, setSelectedView] = useState("detailed");

  useEffect(() => {
    setSummary({
      totalSales: 0,
      totalOrders: 0,
      deliveryOrders: 0,
      pickupOrders: 0,
      averageOrderValue: 0,
      topProducts: [],
      dateRange: "لم يتم تحديد فترة",
    });
  }, []);

  const fetchReportData = () => {
    if (!startDate || !endDate) {
      Swal.fire({
        icon: "warning",
        title: "تاريخ غير مكتمل",
        text: "يرجى تحديد تاريخ البداية والنهاية أولاً",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    if (startDate > endDate) {
      Swal.fire({
        icon: "error",
        title: "خطأ في التاريخ",
        text: "تاريخ البداية يجب أن يكون قبل تاريخ النهاية",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    setLoading(true);
    try {
      const mockData = generateMockReportData(startDate, endDate);
      setReportData(mockData);
      const summaryData = calculateSummary(mockData, startDate, endDate);
      setSummary(summaryData);

      Swal.fire({
        icon: "success",
        title: "تم تحميل التقرير",
        text: `تم تحميل ${mockData.length} عنصر طلب من ${summaryData.totalOrders} طلب`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error fetching report data:", error);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "فشل في تحميل بيانات التقرير",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!reportData || reportData.length === 0) return [];

    const sortableData = [...reportData];
    sortableData.sort((a, b) => {
      if (sortConfig.key === "orderDate") {
        const dateA = new Date(a.orderDate).getTime();
        const dateB = new Date(b.orderDate).getTime();
        if (dateA < dateB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (dateA > dateB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      }

      if (typeof a[sortConfig.key] === "string") {
        if (a[sortConfig.key].toLowerCase() < b[sortConfig.key].toLowerCase()) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key].toLowerCase() > b[sortConfig.key].toLowerCase()) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableData;
  }, [reportData, sortConfig]);

  const handlePrint = () => {
    if (!reportData || reportData.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "لا توجد بيانات",
        text: "لا توجد بيانات لعرضها في التقرير",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تقرير المبيعات - Chicken One</title>
        <style>
          @media print {
            body { margin: 0; padding: 20px; font-family: 'Arial', sans-serif; }
            .no-print { display: none !important; }
          }
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            max-width: 100%;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #E41E26;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #E41E26;
            margin: 0;
            font-size: 28px;
          }
          .header .date-range {
            color: #666;
            font-size: 16px;
            margin-top: 10px;
          }
          .header .view-type {
            color: #666;
            font-size: 16px;
            margin-top: 5px;
            font-weight: bold;
          }
          .summary-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border-right: 4px solid #FDB913;
          }
          .summary-section h2 {
            color: #333;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 20px;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
          }
          .summary-item {
            background: white;
            padding: 15px;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .summary-item .label {
            color: #666;
            font-size: 14px;
            margin-bottom: 5px;
          }
          .summary-item .value {
            color: #E41E26;
            font-size: 24px;
            font-weight: bold;
          }
          .table-section {
            margin-top: 30px;
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            background: #E41E26;
            color: white;
            padding: 12px;
            text-align: right;
            font-weight: bold;
          }
          td {
            padding: 10px;
            text-align: right;
            border-bottom: 1px solid #ddd;
          }
          tr:nth-child(even) {
            background: #f9f9f9;
          }
          .total-row {
            background: #f8f9fa !important;
            font-weight: bold;
          }
          .delivery { color: #2196F3; }
          .pickup { color: #4CAF50; }
          .top-products {
            margin-top: 30px;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-right: 4px solid #E41E26;
          }
          .product-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          .product-item:last-child {
            border-bottom: none;
          }
          .product-rank {
            background: #E41E26;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>تقرير المبيعات - Chicken One</h1>
          <div class="date-range">${
            summary?.dateRange || "فترة غير محددة"
          }</div>
          <div class="view-type">وضع العرض: ${
            selectedView === "detailed" ? "تفصيلي" : "ملخص"
          }</div>
        </div>

        <div class="summary-section">
          <h2>ملخص التقرير</h2>
          <div class="summary-grid">
            <div class="summary-item">
              <div class="label">إجمالي المبيعات</div>
              <div class="value">${
                summary?.totalSales?.toFixed(2) || "0.00"
              } ج.م</div>
            </div>
            <div class="summary-item">
              <div class="label">عدد الطلبات</div>
              <div class="value">${summary?.totalOrders || "0"}</div>
            </div>
            <div class="summary-item">
              <div class="label">متوسط قيمة الطلب</div>
              <div class="value">${
                summary?.averageOrderValue?.toFixed(2) || "0.00"
              } ج.م</div>
            </div>
            <div class="summary-item">
              <div class="label">طلبات التوصيل</div>
              <div class="value">${summary?.deliveryOrders || "0"}</div>
            </div>
            <div class="summary-item">
              <div class="label">طلبات الاستلام</div>
              <div class="value">${summary?.pickupOrders || "0"}</div>
            </div>
          </div>
        </div>

        ${
          summary?.topProducts?.length > 0
            ? `
          <div class="top-products">
            <h2>المنتجات الأكثر مبيعاً (أعلى 5)</h2>
            ${summary.topProducts
              .map(
                (product, index) => `
              <div class="product-item">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div class="product-rank">${index + 1}</div>
                  <div>
                    <strong>${product.name}</strong>
                    <div style="font-size: 12px; color: #666;">${
                      product.quantity
                    } وحدة مباعة</div>
                  </div>
                </div>
                <div>
                  <strong>${product.revenue.toFixed(2)} ج.م</strong>
                  <div style="font-size: 12px; color: #666;">
                    ${(product.revenue / product.quantity).toFixed(
                      2
                    )} ج.م لكل وحدة
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }

        ${
          selectedView === "detailed" && reportData.length > 0
            ? `
          <div class="table-section">
            <h2>تفاصيل المبيعات (${Math.min(20, reportData.length)} عنصر)</h2>
            <table>
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>التاريخ والوقت</th>
                  <th>المنتج</th>
                  <th>الكمية</th>
                  <th>سعر الوحدة</th>
                  <th>الإجمالي</th>
                  <th>نوع الطلب</th>
                </tr>
              </thead>
              <tbody>
                ${sortedData
                  .slice(0, 20)
                  .map(
                    (item) => `
                  <tr>
                    <td>#${item.orderId.toString().substring(0, 8)}</td>
                    <td>${format(
                      new Date(item.orderDate),
                      "dd/MM/yyyy HH:mm"
                    )}</td>
                    <td>${item.productName}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unitPrice.toFixed(2)} ج.م</td>
                    <td><strong>${item.totalPrice.toFixed(2)} ج.م</strong></td>
                    <td class="${
                      item.orderType === "Delivery" ? "delivery" : "pickup"
                    }">
                      ${item.orderType === "Delivery" ? "توصيل" : "استلام"}
                    </td>
                  </tr>
                `
                  )
                  .join("")}
                <tr class="total-row">
                  <td colspan="4"><strong>المجموع الكلي:</strong></td>
                  <td colspan="3">
                    <strong>${sortedData
                      .slice(0, 20)
                      .reduce((sum, item) => sum + item.totalPrice, 0)
                      .toFixed(2)} ج.م</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        `
            : ""
        }

        <div class="footer">
          <p>تم الإنشاء في: ${format(new Date(), "yyyy-MM-dd HH:mm")}</p>
          <p>Chicken One © ${new Date().getFullYear()}</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = document.createElement("iframe");
    printWindow.style.position = "absolute";
    printWindow.style.width = "0";
    printWindow.style.height = "0";
    printWindow.style.border = "none";

    document.body.appendChild(printWindow);

    const printDoc = printWindow.contentWindow.document;
    printDoc.open();
    printDoc.write(printContent);
    printDoc.close();

    setTimeout(() => {
      printWindow.contentWindow.focus();
      printWindow.contentWindow.print();

      setTimeout(() => {
        document.body.removeChild(printWindow);
      }, 100);
    }, 100);
  };

  const handleDateFilter = () => {
    fetchReportData();
  };

  const formatCurrency = (amount) => {
    return `${amount?.toFixed(2)} ج.م`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#fff8e7] to-[#ffe5b4] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#E41E26]"></div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-white via-[#fff8e7] to-[#ffe5b4] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-3 sm:px-4 md:px-6 py-6 relative font-sans overflow-hidden transition-colors duration-300"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 -top-10 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-r from-[#E41E26]/10 to-[#FDB913]/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-r from-[#FDB913]/10 to-[#E41E26]/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="max-w-7xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-xl rounded-2xl sm:rounded-3xl border border-white/50 dark:border-gray-700/50 relative overflow-hidden transition-colors duration-300"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#E41E26] to-[#FDB913] px-6 py-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <FaChartBar className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  تقارير المبيعات
                </h1>
                <p className="text-white/90 text-sm">
                  تحليل مفصل لأداء المبيعات والفروع
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6" dir="rtl">
          {/* Date Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 sm:p-6 mb-6 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-[#E41E26] text-xl" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  فلترة بتاريخ
                </h3>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedView("detailed")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedView === "detailed"
                      ? "bg-[#E41E26] text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <FaTable className="inline mr-2" />
                  تفصيلي
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedView("summary")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedView === "summary"
                      ? "bg-[#E41E26] text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <FaChartBar className="inline mr-2" />
                  ملخص
                </motion.button>
              </div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              dir="rtl"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  من تاريخ
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E41E26]" />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#E41E26] focus:border-transparent outline-none text-right"
                    locale="ar"
                    placeholderText="اختر تاريخ البداية"
                    isClearable
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  إلى تاريخ
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E41E26]" />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#E41E26] focus:border-transparent outline-none text-right"
                    locale="ar"
                    placeholderText="اختر تاريخ النهاية"
                    isClearable
                  />
                </div>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  إجراءات التقرير
                </label>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDateFilter}
                    disabled={!startDate || !endDate}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      startDate && endDate
                        ? "bg-gradient-to-r from-[#E41E26] to-[#FDB913] text-white cursor-pointer"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FaFilter />
                    تطبيق الفلترة
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {selectedView === "summary" && summary && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              >
                {/* Total Sales Card */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">إجمالي المبيعات</p>
                      <p className="text-2xl font-bold mt-1">
                        {formatCurrency(summary.totalSales)}
                      </p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-xl">
                      <FaDollarSign className="text-2xl" />
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="opacity-90">عدد الطلبات: </span>
                    <span className="font-bold">{summary.totalOrders}</span>
                  </div>
                </div>

                {/* Average Order Value */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-5 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">متوسط قيمة الطلب</p>
                      <p className="text-2xl font-bold mt-1">
                        {formatCurrency(summary.averageOrderValue)}
                      </p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-xl">
                      <FaShoppingCart className="text-2xl" />
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="opacity-90">قيمة كل طلب في المتوسط</span>
                  </div>
                </div>

                {/* Delivery Orders */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-5 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">طلبات التوصيل</p>
                      <p className="text-2xl font-bold mt-1">
                        {summary.deliveryOrders}
                      </p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-xl">
                      <FaTruck className="text-2xl" />
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="opacity-90">
                      {summary.totalOrders > 0
                        ? (
                            (summary.deliveryOrders / summary.totalOrders) *
                            100
                          ).toFixed(1)
                        : "0.0"}
                      % من الطلبات
                    </span>
                  </div>
                </div>

                {/* Pickup Orders */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-5 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">طلبات الاستلام</p>
                      <p className="text-2xl font-bold mt-1">
                        {summary.pickupOrders}
                      </p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-xl">
                      <FaStore className="text-2xl" />
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="opacity-90">
                      {summary.totalOrders > 0
                        ? (
                            (summary.pickupOrders / summary.totalOrders) *
                            100
                          ).toFixed(1)
                        : "0.0"}
                      % من الطلبات
                    </span>
                  </div>
                </div>
              </motion.div>

              {summary?.topProducts?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FaChartBar className="text-[#E41E26] text-xl" />
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        المنتجات الأكثر مبيعاً
                      </h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      أعلى 5 منتجات حسب الإيرادات
                    </span>
                  </div>

                  <div className="space-y-3">
                    {summary.topProducts.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#E41E26] to-[#FDB913] flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {product.quantity} وحدة مباعة
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800 dark:text-white">
                            {formatCurrency(product.revenue)}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {product.quantity > 0
                              ? formatCurrency(
                                  product.revenue / product.quantity
                                )
                              : "0.00"}{" "}
                            لكل وحدة
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}

          {selectedView === "detailed" &&
            reportData &&
            reportData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg"
              >
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <FaListAlt className="text-[#E41E26] text-xl" />
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        تفاصيل المبيعات
                      </h3>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {reportData.length} عنصر طلب • {summary?.totalOrders} طلب
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th
                          className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
                          onClick={() => handleSort("orderId")}
                        >
                          <div className="flex items-center gap-1 justify-end">
                            رقم الطلب
                            {sortConfig.key === "orderId" &&
                              (sortConfig.direction === "asc" ? (
                                <FaSortAmountUp className="text-[#E41E26]" />
                              ) : (
                                <FaSortAmountDown className="text-[#E41E26]" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
                          onClick={() => handleSort("orderDate")}
                        >
                          <div className="flex items-center gap-1 justify-end">
                            التاريخ والوقت
                            {sortConfig.key === "orderDate" &&
                              (sortConfig.direction === "asc" ? (
                                <FaSortAmountUp className="text-[#E41E26]" />
                              ) : (
                                <FaSortAmountDown className="text-[#E41E26]" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
                          onClick={() => handleSort("productName")}
                        >
                          <div className="flex items-center gap-1 justify-end">
                            المنتج
                            {sortConfig.key === "productName" &&
                              (sortConfig.direction === "asc" ? (
                                <FaSortAmountUp className="text-[#E41E26]" />
                              ) : (
                                <FaSortAmountDown className="text-[#E41E26]" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
                          onClick={() => handleSort("quantity")}
                        >
                          <div className="flex items-center gap-1 justify-end">
                            الكمية
                            {sortConfig.key === "quantity" &&
                              (sortConfig.direction === "asc" ? (
                                <FaSortAmountUp className="text-[#E41E26]" />
                              ) : (
                                <FaSortAmountDown className="text-[#E41E26]" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
                          onClick={() => handleSort("unitPrice")}
                        >
                          <div className="flex items-center gap-1 justify-end">
                            سعر الوحدة
                            {sortConfig.key === "unitPrice" &&
                              (sortConfig.direction === "asc" ? (
                                <FaSortAmountUp className="text-[#E41E26]" />
                              ) : (
                                <FaSortAmountDown className="text-[#E41E26]" />
                              ))}
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
                          onClick={() => handleSort("totalPrice")}
                        >
                          <div className="flex items-center gap-1 justify-end">
                            الإجمالي
                            {sortConfig.key === "totalPrice" &&
                              (sortConfig.direction === "asc" ? (
                                <FaSortAmountUp className="text-[#E41E26]" />
                              ) : (
                                <FaSortAmountDown className="text-[#E41E26]" />
                              ))}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">
                          نوع الطلب
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {sortedData.slice(0, 20).map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150"
                        >
                          <td className="px-4 py-3 text-right font-mono text-sm text-gray-600 dark:text-gray-400">
                            #{item.orderId.toString().substring(0, 8)}
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-400">
                            {format(
                              new Date(item.orderDate),
                              "dd/MM/yyyy HH:mm"
                            )}
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-gray-800 dark:text-white">
                            {item.productName}
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-400">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-green-600 dark:text-green-400">
                            {formatCurrency(item.unitPrice)}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-[#E41E26] dark:text-[#FDB913]">
                            {formatCurrency(item.totalPrice)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                item.orderType === "Delivery"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              }`}
                            >
                              {item.orderType === "Delivery" ? (
                                <>
                                  <FaTruck className="text-xs" />
                                  توصيل
                                </>
                              ) : (
                                <>
                                  <FaStore className="text-xs" />
                                  استلام
                                </>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                      <tr>
                        <td
                          colSpan="4"
                          className="px-4 py-3 text-right font-bold text-gray-800 dark:text-white"
                        >
                          المجموع الكلي:
                        </td>
                        <td colSpan="3" className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <FaDollarSign className="text-[#E41E26]" />
                            <span className="text-xl font-bold text-[#E41E26] dark:text-[#FDB913]">
                              {formatCurrency(
                                sortedData
                                  .slice(0, 20)
                                  .reduce(
                                    (sum, item) => sum + item.totalPrice,
                                    0
                                  )
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {reportData.length > 20 && (
                  <div className="px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      عرض {Math.min(20, reportData.length)} من أصل{" "}
                      {reportData.length} عنصر طلب
                    </p>
                  </div>
                )}
              </motion.div>
            )}

          {(!reportData || reportData.length === 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-5xl mb-4 text-gray-400">📊</div>
              <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300 mb-2">
                لا توجد بيانات لعرضها
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                يرجى تحديد فترة زمنية وتطبيق الفلترة لعرض التقرير
              </p>
            </motion.div>
          )}

          {/* Quick Actions */}
          {reportData && reportData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrint}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#E41E26] to-[#FDB913] text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaPrint className="text-2xl" />
                <div className="text-right">
                  <p className="font-bold">طباعة التقرير</p>
                  <p className="text-sm opacity-90">
                    طباعة التقرير الحالي (وضع{" "}
                    {selectedView === "detailed" ? "تفصيلي" : "ملخص"})
                  </p>
                </div>
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SalesReports;
