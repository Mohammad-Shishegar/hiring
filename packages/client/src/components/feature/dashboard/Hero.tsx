import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import Button from "#base/src/components/button";
import { COMPANY_INFO, PLATFORM_STATS } from "src/utils/constants";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const sectionClass = clsx(
    "flex flex-col gap-5 items-center",
    "bg-gradient-to-br from-emerald-50 to-teal-50",
    "py-20 lg:py-32"
  );

  const dividerClass = clsx(
    "h-[2px] rounded-full",
    "bg-gradient-to-r",
    "md:w-40 sm:w-25 w-12"
  );

  const statCardClass = clsx(
    "bg-white rounded-2xl shadow-lg border border-gray-100 text-center",
    "md:p-8 p-2"
  );

  return (
    <section id="home" className={sectionClass}>
      {/* Header */}
      <div className="flex items-center gap-5">
        <span className={clsx(dividerClass, "from-white to-emerald-600/70")} />
        <p
          className={clsx(
            "border rounded-full font-bold uppercase drop-shadow-md",
            "border-emerald-600 text-emerald-800",
            "md:text-base sm:text-sm text-xs",
            "md:px-8 sm:px-6 px-4 py-2"
          )}
        >
          درباره سیستم ما
        </p>
        <span className={clsx(dividerClass, "from-emerald-600/70 to-white")} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Right Content - Stats */}
          <div className="flex justify-center lg:justify-end">
            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
              {PLATFORM_STATS.map((stat, index) => (
                <div key={index} className={statCardClass}>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    {index === 0
                      ? "کارشناسان جذب و مدیران استخدام به ابزارهای ما اعتماد دارند تا تصمیم‌گیری را ساده‌تر کرده و زمان جذب نیرو را کاهش دهند."
                      : "به جمع سازمان‌های پیشرو بپیوندید که با استخدام ساختاریافته و داده‌محور، تیم‌های قوی‌تری می‌سازند."}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Content */}
          <div className="text-center lg:text-right">
            <h1
              className={clsx(
                "font-bold text-gray-900 leading-tight mb-6",
                "text-4xl md:text-5xl lg:text-6xl"
              )}
            >
              با فناوری هوشمند و داده‌محور، استخدام را{" "}
              <span className="text-emerald-600">ساده‌تر</span>,{" "}
              <span className="text-emerald-600">سریع‌تر</span>,{" "}
              <span className="text-gray-400">انجام دهید</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
              {COMPANY_INFO.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button
                variant="contained"
                size="lg"
                className={clsx(
                  "bg-emerald-600 text-white",
                  "hover:bg-emerald-700"
                )}
                onClick={() => navigate("/hr-login")}
              >
                شروع کنید
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
