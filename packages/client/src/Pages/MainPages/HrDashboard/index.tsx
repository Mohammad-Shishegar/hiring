import { useGet } from "#base/src/helpers/api/useGet";
import { useEffect, useState } from "react";
import { FaHome, FaUsers, FaUserTie } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import HrCart from "src/components/feature/hr-dashboard/HrCart";
import { GrDocumentTest } from "react-icons/gr";
import Typography from "#base/src/components/typography";
import Grid from "#base/src/components/grid/Grid";
import Column from "#base/src/components/grid/Column";
import { useNavigate } from "react-router-dom";
import Box from "#base/src/components/box";

interface ICustomeData {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  number?: string;
  address?: string;
}

const HrDashboard = () => {
  const { data } = useGet("/dashboard/statistics", ["dashboard-statistics"]);
  const [convertData, setConvertData] = useState<any>([]);
  const navigate = useNavigate();

  const quikAccess = [
    {
      key: "totalJobs",
      address: "job",
      title: "کل آگهی‌ها",
      description: "تعداد کل موقعیت‌ها",
      icon: (
        <div className="p-3 flex items-center justify-center bg-blue-200 rounded-md">
          <IoNewspaperOutline size={25} className="text-blue-500" />
        </div>
      ),
    },
    {
      key: "totalAssessments",
      address: "assessments",
      title: "ارزیابی‌ها",
      description: "کل آزمون‌ها",
      icon: (
        <div className="p-3 flex items-center justify-center bg-orange-200 rounded-md">
          <FaUsers size={25} className="text-orange-500" />
        </div>
      ),
    },
    {
      key: "totalCandidates",
      address: "candidates",
      title: "داوطلبان",
      description: "تعداد کل متقاضیان",
      icon: (
        <div className="p-3 flex items-center justify-center bg-green-200 rounded-md">
          <FaUserTie size={25} className="text-green-500" />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (data) {
      const statsConfig = [
        {
          key: "totalJobs",
          number: data?.totalJobs,
          title: "کل آگهی‌ها",
          description: "تعداد کل موقعیت‌ها",
          icon: (
            <div className="p-3 flex items-center justify-center bg-blue-200 rounded-md">
              <IoNewspaperOutline size={25} className="text-blue-500" />
            </div>
          ),
        },
        {
          key: "activeJobs",
          number: data?.activeJobs,
          title: "آگهی‌های فعال",
          description: "آگهی‌هایی فعال",
          icon: (
            <div className="p-3 flex items-center justify-center bg-purple-200 rounded-md">
              <GrDocumentTest size={25} className="text-purple-500" />
            </div>
          ),
        },
        {
          key: "totalAssessments",
          number: data?.totalAssessments,
          title: "ارزیابی‌ها",
          description: "کل آزمون‌ها",
          icon: (
            <div className="p-3 flex items-center justify-center bg-orange-200 rounded-md">
              <FaUsers size={25} className="text-orange-500" />
            </div>
          ),
        },
        {
          key: "totalCandidates",
          title: "داوطلبان",
          number: data?.totalCandidates,
          description: "تعداد کل متقاضیان",
          icon: (
            <div className="p-3 flex items-center justify-center bg-green-200 rounded-md">
              <FaUserTie size={25} className="text-green-500" />
            </div>
          ),
        },
      ];
      setConvertData(statsConfig);
    }
  }, [data]);

  return (
    <div className="text-right">
      <Typography tag="h1" className="font-bold text-[24px]">
        بخش منابع انسانی
      </Typography>
      <Typography tag="p" className="my-3 ">
        به بخش مدیریت خوش آمدید
      </Typography>
      <Grid className="mt-5">
        {convertData.map((item: ICustomeData, index: number) => (
          <Column key={index} xs={12} sm={6} md={3} lg={3}>
            <HrCart
              number={item?.number}
              icon={item.icon}
              className={"flex-1"}
              description={item?.description}
              title={item?.title}
            />
          </Column>
        ))}
      </Grid>
      <Typography tag="h2" className="font-bold mt-10 text-[22px]">
        دسترسی سریع
      </Typography>
      <Grid className="mt-5">
        {quikAccess.map((item: ICustomeData, index: number) => (
          <Column key={index} xs={12} sm={6} md={4} lg={4}>
            <HrCart
              onCLick={() => navigate(item!.address!)}
              icon={item.icon}
              className={
                "flex-1 py-7 cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
              }
              description={item?.description}
              title={item?.title}
            />
          </Column>
        ))}
      </Grid>
      <Grid className="mt-5">
        <Column xs={12} sm={12} md={12} lg={12} className="mt-5">
          <Box className="bg-white rounded-lg shadow-sm border border-emerald-300 p-6">
            <Typography
              tag="h2"
              className="text-xl font-semibold text-gray-900 mb-4"
            >
              فعالیت اخیر
            </Typography>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 justify-end ">
                <Typography
                  tag="span"
                  className="md:text-sm text-xs text-gray-600"
                >
                  {data?.newCandidates}
                  نفرات جدید این هفته درخواست دادند
                </Typography>
                <Typography
                  tag="span"
                  className="text-xs text-gray-400 ml-auto"
                >
                  این هفته
                </Typography>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-end space-x-3">
                <Typography
                  tag="span"
                  className="md:text-sm text-xs text-gray-600"
                >
                  {data?.completedAssessments} ارزیابی‌ها تکمیل شد
                </Typography>
                <Typography
                  tag="span"
                  className="text-xs text-gray-400 ml-auto"
                >
                  این هفته
                </Typography>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-3 justify-end ">
                <Typography
                  tag="span"
                  className="md:text-sm text-xs text-gray-600"
                >
                  {data?.activeJobs} آگهی‌های شغلی فعال
                </Typography>
                <Typography tag="span" className="text-xs text-gray-400 ml-auto">اکنون</Typography>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-3 justify-end ">
                <Typography
                  tag="span"
                  className="md:text-sm text-xs text-gray-600"
                >
                  {data?.interviewsScheduled} مصاحبه‌های برنامه‌ریزی‌شده
                </Typography>
                <Typography
                  tag="span"
                  className="text-xs text-gray-400 ml-auto"
                >
                  آینده
                </Typography>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </Box>
        </Column>
      </Grid>
    </div>
  );
};

export default HrDashboard;
