import Button from "#base/src/components/button";
import Typography from "#base/src/components/typography";

const ErorrPage = () => {
  return (
    <div className="flex items-center justify-center">
      <Typography tag="h1">خطایی رخ داد</Typography>
      <Button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }}
      >
        خانه
      </Button>
    </div>
  );
};

export default ErorrPage;
