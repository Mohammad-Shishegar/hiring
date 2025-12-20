import { clsx } from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { BsFileEarmarkPdfFill, BsFileImage } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaRegFileWord } from "react-icons/fa";
import { LuFileVideo2 } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { TbDownload } from "react-icons/tb";

interface FileUploaderProps {
  accept?: "image" | "pdf" | "word" | "video" | "custom";
  maxSizeMB?: number;
  multiple?: boolean;
  onChange: (files: File[] | null) => void;
  className?: string;
  label?: string;
  customAcceptTypes?: string;
}

const acceptMap = {
  image: "image/*",
  video: "video/*",
  pdf: "application/pdf",
  word: ".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const FileUploader: React.FC<FileUploaderProps> = ({
  accept,
  maxSizeMB = 2,
  multiple = false,
  onChange,
  className,
  label = "آپلود فایل",
  customAcceptTypes,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filesArray, setFilesArray] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    const tooLarge = files.find((file) => file.size > maxSizeMB * 1024 * 1024);

    if (tooLarge) {
      setError(`فایل "${tooLarge.name}" از ${maxSizeMB} مگابایت بیشتره!`);
      onChange(null);
      return;
    }

    setError(null);
    setFilesArray(files);
    onChange(files);

    if (inputRef.current) inputRef.current.value = "";
  };

  const triggerUpload = () => inputRef.current?.click();

  const handleDeleteFile = (name: string) => {
    setFilesArray((cv: Array<[]>) =>
      cv.filter((item: any) => item?.name !== name)
    );
    if (inputRef.current) inputRef.current.value = "";
  };

  const downloadFile = (file: File) => {
    const url = URL?.createObjectURL(file);
    const a = document?.createElement("a");
    a.href = url;
    a.download = file?.name;
    document?.body?.appendChild(a);
    a?.click();
    document?.body?.removeChild(a);
    URL?.revokeObjectURL(url);
  };

  const handleLoadIcon = (type: string) => {
    if (type.startsWith("image"))
      return <BsFileImage size={12} className="text-blue-400" />;
    if (type === "application/pdf")
      return <BsFileEarmarkPdfFill size={12} className="text-red-400" />;
    if (type.startsWith("video"))
      return <LuFileVideo2 size={12} className="text-purple-400" />;
    if (type.includes("word"))
      return <FaRegFileWord size={12} className="text-blue-400" />;
    return <CiFileOn size={12} className="text-blue-400" />;
  };

  useEffect(() => {
    onChange && onChange(filesArray);
  }, [filesArray]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-2",
        className,
        filesArray?.length > 0
          ? "border-[1px] rounded-md border-solid border-slate-400"
          : ""
      )}
    >
      <button
        type="button"
        onClick={triggerUpload}
        className={clsx(
          "bg-success-600 text-white flex justify-center items-center py-2 rounded hover:bg-success-700"
        )}
      >
        {label}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={
          accept === "custom"
            ? customAcceptTypes
            : acceptMap[accept as keyof typeof acceptMap]
        }
        multiple={multiple}
        className="hidden"
        onChange={handleFileChange}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {filesArray?.length > 0 && (
        <div className={clsx("flex gap-2 flex-wrap rounded-md")}>
          {filesArray.map((item: any, index: number) => (
            <div
              key={index}
              className={clsx(
                "w-full bg-white  p-2 my-1 rounded-md flex justify-between flex-row-reverse hover:bg-slate-200"
              )}
            >
              <div
                className={clsx("flex items-center justify-center gap-x-2 ")}
              >
                <p className={clsx("text-slate-500")}>{item?.name}</p>
                {handleLoadIcon(item?.type)}
              </div>
              <div
                className={clsx("flex items-center justify-center gap-x-2 ")}
              >
                <MdDeleteForever
                  size={13}
                  onClick={() => handleDeleteFile(item?.name)}
                  className={clsx(
                    "text-error-500 cursor-pointer transition-all hover:scale-125"
                  )}
                />
                <TbDownload
                  size={13}
                  onClick={() => downloadFile(item)}
                  className={clsx(
                    "text-success-500 cursor-pointer transition-all hover:scale-125"
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
