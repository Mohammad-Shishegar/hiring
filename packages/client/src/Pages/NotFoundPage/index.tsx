import Image from "#base/src/components/image";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center bg-blue-800">
      <Image
        className="bg-cover bg-no-repeat bg-center h-screen"
        src="Images/404.png"
      />
    </div>
  );
};

export default NotFound;
