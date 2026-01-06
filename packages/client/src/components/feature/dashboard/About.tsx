import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Button from "#base/src/components/button";

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className={clsx(
        "flex flex-col gap-12 items-center",
        "py-16 lg:py-24 bg-white"
      )}
    >
      <div className={clsx("flex items-center gap-5")}>
        <span
          className={clsx(
            "md:w-40 sm:w-25 w-12 h-[2px]",
            "bg-gradient-to-r from-white to-emerald-600/70 rounded-full"
          )}
        />
        <p
          className={clsx(
            "border font-bold uppercase drop-shadow-md rounded-full",
            "md:text-base sm:text-sm text-xs",
            "md:px-8 sm:px-6 px-4 py-2",
            "border-emerald-600 text-emerald-800"
          )}
        >
          سکوی هوشمند ما
        </p>
        <span
          className={clsx(
            "md:w-40 sm:w-25 w-12 h-[2px]",
            "bg-gradient-to-r from-emerald-600/70 to-white rounded-full"
          )}
        />
      </div>

      <div className={clsx("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8")}>
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          )}
        >
          {/* Image */}
          <div
            className={clsx(
              "w-full flex justify-items-center",
              "border-2 border-emerald-600 rounded-2xl overflow-hidden"
            )}
          >
            <img src="Images/about.png" alt="About" />
          </div>

          {/* Content */}
          <div>
            <h2
              className={clsx(
                "text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-right" 
              )}
            >
              همین الان با سکوی هوشمند ما بهترین نیروی انسانی را پیدا کنید
            </h2>

            <p
              className={clsx(
                "text-lg text-gray-600 mb-8 leading-relaxed text-right"
              )}
            >
              با ابزارهای هوشمند و داده محور، تیم استخدام خود را قدرتمند تر کنید تا بهترین نیروی انسانی را جذب، ارزیابی و نگهداری کنید
            </p>

            <div className={clsx("space-y-4 mb-8")}>
              {[
                {
                  title: "مدیریت شغلی هوشمند",
                  desc: "ایجاد، مدیریت و ردیابی پست های استخدام با سیستم هوشمند ما طراحی شده برای استخدام بهینه.",
                },
                {
                  title: "مدیریت لایه انتخاب",
                  desc: "ردیابی پیشرفت کاندیداها با ابزارهای هوشمند و مدیریت درخواست ها.",
                },
                {
                  title: "ابزارهای ارزیابی کامل",
                  desc: "ایجاد و مدیریت ارزیابی های کاندیداها با سیستم ارزیابی قدرتمند ما تا بهترین تناسب برای نقش های شما را پیدا کنید.",
                },
              ].map((item, index) => (
                <div key={index} className={clsx("flex items-start space-x-3")}>
                <div className={clsx("text-right w-full")}>
                  <h3 className={clsx("font-semibold text-right text-gray-900 mb-1")}>
                    {item.title}
                  </h3>
                  <p className={clsx("text-gray-600 text-right")}>{item.desc}</p>
                </div>
                  <div
                    className={clsx(
                      "w-6 h-6 mt-0.5 flex-shrink-0",
                      "rounded-full bg-emerald-100",
                      "flex items-center justify-center"
                    )}
                  >
                    <svg
                      className={clsx("w-3 h-3 text-emerald-600")}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
