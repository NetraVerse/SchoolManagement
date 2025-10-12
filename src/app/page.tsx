"use client";
import React, { useEffect, useRef, useState } from "react";
import { BellDot, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import TitleHeader from "@/components/TitileHeader";
const Dashboard: React.FC = () => {
  const [profileName, setProfileName] = useState("Guest");
  const [profileRole, setProfileRole] = useState("Unknown Role");
  const [company, setCompany] = useState(0);
  const [user, setUser] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalData, setModalData] = useState<string[]>([]);

  const [showStockReport, setShowStockReport] = useState(false);
  const [showPurchaseRegister, setShowPurchaseRegister] = useState(false);
  const [showSalesRegister, setShowSalesRegister] = useState(false);
  const [showAnnexReport, setShowAnnexReport] = useState(false);
  const navigate = useRouter();
  type OpenDropdownType = "profile" | "translation" | "notification" | null;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<OpenDropdownType>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<
    string | undefined
  >("");
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const parsedDetails = JSON.parse(userDetails);
      setProfileName(parsedDetails.username || "Guest");
      setProfileRole(parsedDetails.role || "Unknown Role");
    }
  }, []);
  const toggleLogoutVisibility = () => {
    setOpenDropdown((prev) => (prev === "profile" ? null : "profile"));
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node | null)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEnlargeClick = (category: string, data: any[]) => {
    setSelectedCategory(category);

    let extractedData: string[] = [];
    if (category === "Company") {
      extractedData = data
        .map((item) => item?.id || "Unknown Purchase")
        .filter(Boolean);
    } else if (category === "User") {
      extractedData = data
        .map((item) => item?.id || "Unknownsales")
        .filter(Boolean);
    } else if (category === "Purchase Return") {
      extractedData = data
        .map((item) => item?.id || "Unknown PurchaseReturn")
        .filter(Boolean);
    } else if (category === "Sales Return") {
      extractedData = data
        .map((item) => item?.id || "Unknown salesReturn")
        .filter(Boolean);
    }

    setModalData(extractedData);
    setIsModalOpen(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate.push("/");
  };
  const toggleNotificationVisibility = () => {
    setOpenDropdown((prev) =>
      prev === "notification" ? null : "notification"
    );
  };
  const toggleTranslation = () => {
    setOpenDropdown((prev) => (prev === "translation" ? null : "translation"));
  };
  const handleNepaliTranslate = () => {
    localStorage.setItem("language", "नेपाली");
    toggleTranslation();
  };
  const handleEnglishTranslate = () => {
    localStorage.setItem("language", "English");
    toggleTranslation();
  };
  return (
    <div className="flex flex-col bg-[#FBFBFB] min-h-full ">
      {/* <header className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-3 rounded-md shadow gap-3">
        <h1 className="text-xl text-black font-bold ml-5 mb-2">
          {"Dashboard"}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 h-full cursor-pointer">
            <div
              className="flex items-center gap-2 h-full"
              onClick={() => {
                toggleTranslation();
              }}
            >
              <button type="button" className="bg-white " />
              <Globe size={26} className="text-black " />
              <button />
            </div>
          </div>
          <div className="flex items-center h-full">
            <button type="button" className="bg-white ">
              <BellDot
                size={26}
                className="text-black "
                onClick={toggleNotificationVisibility}
              />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right"></div>
            <img
              alt="User"
              className="w-8 h-9 rounded-full object-cover cursor-pointer ml-auto"
              onClick={toggleLogoutVisibility}
            />
          </div>
        </div>
      </header> */}
      <TitleHeader title="Dashboard" />
      {openDropdown === "profile" && (
        <div
          ref={dropdownRef}
          className="absolute right-2 top-[8vh] w-64 max-w-[90vw] sm:w-56 bg-white  border border-gray-200 rounded-xl shadow-xl z-50 animate-fade-in"
        >
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <img className="w-10 h-10 rounded-full" alt="User" />
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-semibold text-gray-900  truncate">
                {`${profileName}`}
              </p>
              <p className="text-xs text-gray-500  truncate">
                {`${profileRole}`}
              </p>
            </div>
          </div>

          <ul className="py-2 text-sm">
            <li className="px-4 py-2 hover:bg-gray-100  cursor-pointer flex items-center gap-3 text-gray-700 ">
              <img alt="profile" className="w-5 h-5" />
              <span>{"Profile"}</span>
            </li>
            <li
              onClick={() => navigate.push("/end-user/settings/settings")}
              className="px-4 py-2 hover:bg-gray-100  cursor-pointer flex items-center gap-3 text-gray-700 "
            >
              <img alt="setting" className="w-5 h-5" />
              <span>{"Settings"}</span>
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-red-50 cursor-pointer flex items-center gap-3 text-red-500"
            >
              <img alt="logout" className="w-5 h-5" />
              <span>{"Logout"}</span>
            </li>
          </ul>
        </div>
      )}
      {openDropdown === "translation" && (
        <div
          ref={dropdownRef}
          className="absolute top-[5rem] mt-[-1%] right-3 sm:right-[7rem] min-w-[150px] sm:min-w-[170px] w-auto max-w-[320px] bg-white border border-gray-200 rounded-sm shadow-lg  z-10  animate-fade-in"
        >
          <div
            onClick={handleEnglishTranslate}
            className="hover:bg-gray-100 cursor-pointer px-2 py-1"
          >
            English
          </div>
          <div
            onClick={handleNepaliTranslate}
            className="hover:bg-gray-100 cursor-pointer px-2 py-1"
          >
            नेपाली
          </div>
        </div>
      )}
      {openDropdown === "notification" && (
        <div
          ref={dropdownRef}
          className="absolute top-[4.5rem] mt-[-1%] right-[1rem] sm:right-[5rem]
             min-w-[250px] sm:min-w-[300px] w-auto max-w-[420px] h-[28rem]
             bg-white border border-gray-200 rounded-md shadow-xl z-50
             animate-fade-in p-4 overflow-y-auto flex items-center justify-center"
        >
          <span className="text-center text-sm text-gray-500">
            Notifications are displayed here...
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 ">
        {/* {[
          {
            icon: isDark ? purchaseWhite : purchaseIcon,
            title: `${t("Company")}`,
            count: company,
          },

          {
            icon: isDark ? salesWhite : salesIcon,
            title: `${t("User")}`,
            count: user,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#202024] dark:text-white text-black p-3  rounded-lg shadow-md relative"
          >
            <img
              alt="Dashboard"
              className=" h-5 mb-2 absolute dark:bg-[#202024] dark:color-white"
            />
            <h2 className="text-lg font-semibold ml-8">{t(`${item.title}`)}</h2>
            <img
              alt="Expand"
              className="h-5 absolute top-2 right-2 cursor-pointer"
              onClick={() => handleEnlargeClick(item.title, ["asdf"])}
            />
          </div>
        ))} */}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        <div className="lg:w-full bg-white  rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-black">
            {"Table of Company Details"}
          </h2>

          <div className="overflow-x-auto">
            <div className="w-full max-h-[500px] overflow-y-auto overflow-x-auto border rounded-md">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100 text-sm font-semibold text-gray-700  sticky top-0 z-10">
                  <tr>
                    <th className="border px-4 py-2 text-left">Company Name</th>
                    <th className="border px-4 py-2 text-left">Address</th>
                    <th className="border px-4 py-2 text-left">PAN</th>
                    <th className="border px-4 py-2 text-left">Phone Number</th>
                    <th className="border px-4 py-2 text-left">
                      Stock Details
                    </th>
                    <th className="border px-4 py-2 text-left">
                      Purchase Vat Register
                    </th>
                    <th className="border px-4 py-2 text-left">
                      Sales VAT Register
                    </th>
                    <th className="border px-4 py-2 text-left">
                      Annex13 Report
                    </th>
                    <th className="border px-4 py-2 text-left">
                      Purchase Bill List
                    </th>
                    <th className="border px-4 py-2 text-left">
                      Sales Bill List
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {Array.isArray(companyDetails) &&
                    companyDetails.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-[#29292c]"
                      >
                        <td className="border px-4 py-2">{item.name}</td>
                        <td className="border px-4 py-2">{item.address}</td>
                        <td className="border px-4 py-2">{item.pan}</td>
                        <td className="border px-4 py-2">
                          {item.contactNumber}
                        </td>
                        <td className="border px-4 py-2 text-center ">
                          <button
                            type="button"
                            className="text-teal-500 underline"
                            onClick={() => {
                              setSelectedCompanyId(item.id);
                              setShowStockReport(true);
                            }}
                          >
                            {t("View")}
                          </button>
                        </td>
                        <td className="border px-4 py-2 text-center text-teal-500 underline">
                          <button
                            type="button"
                            className="text-teal-500 underline"
                            onClick={() => {
                              setSelectedCompanyId(item.id);
                              setShowPurchaseRegister(true);
                            }}
                          >
                            {t("View")}
                          </button>
                        </td>
                        <td className="border px-4 py-2 text-center text-teal-500 underline">
                          <button
                            type="button"
                            className="text-teal-500 underline"
                            onClick={() => {
                              setSelectedCompanyId(item.id);
                              setShowSalesRegister(true);
                            }}
                          >
                            {t("View")}
                          </button>
                        </td>
                        <td className="border px-4 py-2 text-center text-teal-500 underline">
                          <button
                            type="button"
                            className="text-teal-500 underline"
                            onClick={() => {
                              setSelectedCompanyId(item.id);
                              setShowAnnexReport(true);
                            }}
                          >
                            {t("View")}
                          </button>
                        </td>
                        <td className="border px-4 py-2 text-center text-teal-500 underline">
                          {t("View")}
                        </td>
                        <td className="border px-4 py-2 text-center text-teal-500 underline">
                          {t("View")}
                        </td>
                      </tr>
                    ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2  text-black">
          {"Transaction Details"}
        </h2>

        <ul className="mt-4 space-y-3">
          <li className="flex items-center justify-between p-3 bg-gray-100  rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-lg">💰</span>
              <p className="text-sm text-gray-700">
                {"Payment"} {"Received"} -{" "}
                <span className="text-green-400">$100</span>
              </p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </li>
          <li className="flex items-center justify-between p-3 bg-gray-100  rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-lg">📉</span>
              <p className="text-sm text-gray-700 ">
                {"Payment"} {"Sent"}- <span className="text-red-400">$75</span>{" "}
              </p>
            </div>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </li>
          <li className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-blue-500 text-lg">🔄</span>
              <p className="text-sm text-gray-700">
                {"Refund Processed"} -{" "}
                <span className="text-blue-400">$50</span>
              </p>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </li>
        </ul>

        <div className="mt-4 text-center">
          <button className="px-4 py-2 text-sm font-medium text-white bg-teal-400 rounded-md hover:bg-teal-600 transition">
            {"View More"}
          </button>
        </div>
      </div>
      {showStockReport && (
        <div
          id="stock-report-container"
          className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 ml-[13%]"
          onClick={(e) => {
            if ((e.target as HTMLDivElement).id === "stock-report-container") {
              setShowStockReport(false);
            }
          }}
        >
          <div
            className="bg-white  rounded-lg shadow-lg overflow-auto 
                w-[99%]  h-[100%]"
          >
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={() => setShowStockReport(false)}
                className="text-red-500 font-bold text-lg"
              >
                <img alt="close" className="w-8 h-7" />
              </button>
            </div>
          </div>
        </div>
      )}
      {showPurchaseRegister && (
        <div
          id="purchase-register-report-container"
          className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 ml-[13%]"
          onClick={(e) => {
            if (
              (e.target as HTMLDivElement).id ===
              "purchase-register-report-container"
            ) {
              setShowPurchaseRegister(false);
            }
          }}
        >
          <div
            className="bg-white p-1 rounded-lg shadow-lg overflow-auto 
                w-[100%]  min-h-screen"
          >
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={() => setShowPurchaseRegister(false)}
                className="text-red-500 font-bold text-lg"
              >
                <img alt="close" className="w-8 h-7" />
              </button>
            </div>
          </div>
        </div>
      )}
      {showSalesRegister && (
        <div
          id="sales-register-report-container"
          className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 ml-[13%]"
          onClick={(e) => {
            if (
              (e.target as HTMLDivElement).id ===
              "sales-register-report-container"
            ) {
              setShowSalesRegister(false);
            }
          }}
        >
          <div
            className="bg-white p-1 rounded-lg shadow-lg overflow-auto 
                w-[100%]  min-h-screen"
          >
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={() => setShowSalesRegister(false)}
                className="text-red-500 font-bold text-lg"
              >
                <img alt="close" className="w-8 h-7" />
              </button>
            </div>
          </div>
        </div>
      )}
      {showAnnexReport && (
        <div
          id="annex-report-container"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ml-[13%]"
          onClick={(e) => {
            if ((e.target as HTMLDivElement).id === "annex-report-container") {
              setShowAnnexReport(false);
            }
          }}
        >
          <div
            className="bg-white p-1 rounded-lg shadow-lg overflow-auto 
                w-[100%]  min-h-screen"
          >
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={() => setShowAnnexReport(false)}
                className="text-red-500 font-bold text-lg"
              >
                <img alt="close" className="w-8 h-7" />
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div
          id="container"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={(e) => {
            if ((e.target as HTMLDivElement).id === "container") {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">{selectedCategory}</h2>
            <ul className="max-h-60 overflow-y-auto list-disc pl-5">
              {modalData.map((item, index) => (
                <li key={index} className="text-gray-700 ">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
