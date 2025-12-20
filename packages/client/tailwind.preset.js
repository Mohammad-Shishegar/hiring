/** @type {import('tailwindcss').Config} */

import tailwindcssThemer from "tailwindcss-themer";

const commonColors = {
  gray: {
    50: "#F8F8F8",
    100: "#F2F2F2",
    200: "#DCDCDC",
    300: "#BDBDBD",
    400: "#989898",
    500: "#7C7C7C",
    600: "#656565",
    700: "#525252",
    800: "#464646",
    900: "#3D3D3D",
    950: "#292929",
  },

  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052E16",
  },

  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450A0A",
  },

  warning: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  },

  main: "#f5f6f8",
  paper: "#12212E",
};

const redThemeColors = {
  primary: {
    100: "#FAEBEA",
    150: "#F5D5D3",
    200: "#F0C0BD",
    250: "#EBABA7",
    300: "#E79590",
    350: "#E2087A",
    400: "#DD6B64",
    450: "#D8564E",
    500: "#D34138",
    550: "#C2342B",
    600: "#AA2D26",
    650: "#922720",
    700: "#79201B",
    750: "#611A15",
    800: "#491310",
    850: "#310D0B",
    900: "#180605",
  },
  secondary: {
    100: "#DEECF8",
    150: "#BDD9F1",
    200: "#9CC6EA",
    250: "#7BB3E3",
    300: "#5AA0DC",
    350: "#398DD5",
    400: "#2879BE",
    450: "#21649D",
    500: "#1A4F7C",
    550: "#17466E",
    600: "#143D60",
    650: "#113553",
    700: "#0E2C45",
    750: "#0C2337",
    800: "#091A29",
    850: "#06121C",
    900: "#03090E",
  },
  tertiary: {
    500: "#21A366",
  },
};

const GeneralPreset = {
  theme: {
    extend: {
      fontFamily: {
        yekanBakh: ["YekanBakh"],
      },
    },
  },
  plugins: [
    tailwindcssThemer({
      themes: [
        // -------------------------
        // 🔴 1) Red Theme
        // -------------------------
        {
          name: "red-theme",
          extend: {
            colors: {
              ...commonColors,
              ...redThemeColors,

              button: {
                background: redThemeColors.secondary[100],
                text: redThemeColors.secondary[500],
                hover: {
                  background: redThemeColors.secondary[500],
                  text: "white",
                },
              },

              input: {
                text: redThemeColors.secondary[500],
              },

              table: {
                head: {
                  background: redThemeColors.secondary[500],
                },
                skeleton: {
                  background: commonColors.gray[200],
                },
              },
            },
          },
        },

        // -------------------------
        // 🔵 2) Blue Theme
        // -------------------------
        {
          name: "theme-blue",
          extend: {
            colors: {
              ...commonColors,
              primary: {
                100: "#E6F4EC",
                150: "#CCEAD9",
                200: "#B3DFC7",
                250: "#9AD4B4",
                300: "#80CAA1",
                350: "#67BF8E",
                400: "#4EB47C",
                450: "#429C6A",
                500: "#378359",
                550: "#31744F",
                600: "#2B6645",
                650: "#25573B",
                700: "#1F4931",
                750: "#183A28",
                800: "#122C1E",
                850: "#0C1D14",
                900: "#060F0A",
              },

              secondary: {
                100: "#FDF5E7",
                150: "#FBEBCE",
                200: "#F8E2B6",
                250: "#F6D89D",
                300: "#F4CE85",
                350: "#F2C46C",
                400: "#EFBB54",
                450: "#EDB13B",
                500: "#EBA723",
                550: "#DC9814",
                600: "#C18512",
                650: "#A5720F",
                700: "#8A5F0D",
                750: "#6E4C0A",
                800: "#533908",
                850: "#372605",
                900: "#1C1303",
              },

              tertiary: { 500: "#F97F33" },

              gray: commonColors.gray,
            },
          },
        },

        // -------------------------
        // 🟢 3) Second Theme (Turquoise)
        // -------------------------
        {
          name: "second-theme",
          extend: {
            colors: {
              ...commonColors,
              primary: {
                100: "#E4F9F5",
                150: "#CFF3EE",
                200: "#BAEDE7",
                250: "#A5E7DF",
                300: "#90E0D7",
                350: "#7BDACF",
                400: "#66D4C7",
                450: "#51CEBF",
                500: "#3CC8B7",
                550: "#34B3A3",
                600: "#2E9F92",
                650: "#278B80",
                700: "#20776E",
                750: "#1A635C",
                800: "#134F4A",
                850: "#0D3B37",
                900: "#062624",
              },

              secondary: {
                100: "#FFF7E8",
                150: "#FEEFCC",
                200: "#FEE7B1",
                250: "#FEDF95",
                300: "#FDD779",
                350: "#FDCE5E",
                400: "#FCC642",
                450: "#FCBE26",
                500: "#FBB60B",
                550: "#E4A10A",
                600: "#C98F09",
                650: "#AE7C08",
                700: "#936A06",
                750: "#785705",
                800: "#5D4504",
                850: "#423203",
                900: "#271F02",
              },

              tertiary: {
                500: "#4DD6FF",
              },

              gray: {
                50: "#F8F9FA",
                100: "#F1F3F5",
                200: "#E9ECEF",
                300: "#DEE2E6",
                400: "#CED4DA",
                500: "#ADB5BD",
                600: "#868E96",
                700: "#495057",
                800: "#343A40",
                900: "#212529",
                950: "#161A1D",
              },

              button: {
                background: "#E4F9F5",
                text: "#20776E",
                hover: {
                  background: "#3CC8B7",
                  text: "white",
                },
              },

              input: {
                text: "#20776E",
              },

              table: {
                head: {
                  background: "#3CC8B7",
                },
                skeleton: {
                  background: "#E9ECEF",
                },
              },
            },
          },
        },
        {
          name: "dark-theme",
          extend: {
            colors: {
              ...commonColors,
              primary: {
                100: "#1F2A33",
                150: "#1A242C",
                200: "#161F26",
                250: "#121A20",
                300: "#0E1419",
                350: "#0B1014",
                400: "#090D10",
                450: "#070A0D",
                500: "#05080A",
                550: "#040609",
                600: "#030507",
                650: "#020405",
                700: "#020304",
                750: "#010203",
                800: "#010203",
                850: "#000102",
                900: "#000000",
              },

              secondary: {
                100: "#1B3A41",
                150: "#173238",
                200: "#142B30",
                250: "#112428",
                300: "#0E1E21",
                350: "#0B181A",
                400: "#091416",
                450: "#071012",
                500: "#060C0E",
                550: "#05090B",
                600: "#040708",
                650: "#030405",
                700: "#020203",
                750: "#010102",
                800: "#000001",
                850: "#000000",
                900: "#000000",
              },

              // یک فیروزه‌ای نئونی خوشگل برای هایلایت و اکشن‌ها
              tertiary: {
                500: "#2DEBC8",
              },

              // خاکستری‌های دارک
              gray: {
                50: "#2A2F33",
                100: "#23272B",
                200: "#1D2023",
                300: "#181A1D",
                400: "#141618",
                500: "#101214",
                600: "#0C0E10",
                700: "#090B0C",
                800: "#060708",
                900: "#030304",
                950: "#010101",
              },

              // پس‌زمینه‌ها
              main: "#0F141A",
              paper: "#1A232C",

              // Button
              button: {
                background: "#1E2A33",
                text: "#2DEBC8",
                hover: {
                  background: "#2DEBC8",
                  text: "#0F141A",
                },
              },

              // Inputs
              input: {
                text: "#E6E6E6",
              },

              // Table
              table: {
                head: {
                  background: "#1E2A33",
                },
                skeleton: {
                  background: "#23272B",
                },
              },
            },
          },
        },
      ],
    }),
  ],
};

export default GeneralPreset;
