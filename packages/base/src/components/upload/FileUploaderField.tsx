import { clsx } from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import { BsFileEarmarkPdfFill, BsFileImage } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaRegFileWord } from "react-icons/fa";
import { LuFileVideo2 } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { TbDownload } from "react-icons/tb";

interface FileUploaderProps {
  name: string;
  accept?: "image" | "pdf" | "word" | "video" | "custom";
  maxSizeMB?: number;
  multiple?: boolean;
  className?: string;
  label?: string;
  api?: string;
  customAcceptTypes?: string;
}

const acceptMap = {
  image: "image/*",
  video: "video/*",
  pdf: "application/pdf",
  word: ".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const FileUploaderField: React.FC<FileUploaderProps> = ({
  name,
  accept,
  maxSizeMB = 2,
  multiple = false,
  className,
  label = "آپلود فایل",
  customAcceptTypes,
  api, //for download data from server
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [field, meta, helpers] = useField(name);
  const { values, setFieldValue } = useFormikContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    const tooLarge = files.find((file) => file.size > maxSizeMB * 1024 * 1024);

    if (tooLarge) {
      setError(`فایل "${tooLarge.name}" از ${maxSizeMB} مگابایت بیشتره!`);
      setFieldValue(name, null);
      return;
    }

    setError(null);
    console.log([...files, ...meta?.value]);
    setFieldValue(name, [...files, ...meta?.value]);

    if (inputRef.current) inputRef.current.value = "";
  };

  const triggerUpload = () => inputRef.current?.click();

  const handleDeleteFile = (nameToDelete: string) => {
    const newFiles = (field.value || []).filter(
      (file: File) => file.name !== nameToDelete
    );
    setFieldValue(name, newFiles);
    if (inputRef.current) inputRef.current.value = "";
  };

  const downloadFile = (file: File | Object) => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      //request Server for download data
    }
  };

  const handleLoadIcon = (type: string) => {
    if (type?.startsWith("image"))
      return <BsFileImage size={12} className="text-blue-400" />;
    if (type === "application/pdf")
      return <BsFileEarmarkPdfFill size={12} className="text-red-400" />;
    if (type.startsWith("video"))
      return <LuFileVideo2 size={12} className="text-purple-400" />;
    if (type.includes("word"))
      return <FaRegFileWord size={12} className="text-blue-400" />;
    return <CiFileOn size={12} className="text-blue-400" />;
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-2",
        className,
        field.value?.length > 0 &&
          "border-[1px] rounded-md border-solid border-slate-400"
      )}
    >
      <button
        type="button"
        onClick={triggerUpload}
        className="bg-success-600 text-white flex justify-center items-center py-2 rounded hover:bg-success-700"
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

      {(error || (meta.touched && meta.error)) && (
        <p className="text-red-500 text-sm">
          {error || (meta.touched && meta.error)}
        </p>
      )}

      {field.value?.length > 0 && (
        <div className="flex gap-2 flex-wrap rounded-md">
          {field.value.map((item: File, index: number) => (
            <div
              key={index}
              className="w-full bg-white p-2 my-1 rounded-md flex justify-between flex-row-reverse hover:bg-slate-200"
            >
              <div className="flex items-center justify-center gap-x-2">
                <p className="text-slate-500">{item.name}</p>
                {handleLoadIcon(item.type)}
              </div>
              <div className="flex items-center justify-center gap-x-2">
                <MdDeleteForever
                  size={13}
                  onClick={() => handleDeleteFile(item.name)}
                  className="text-error-500 cursor-pointer transition-all hover:scale-125"
                />
                <TbDownload
                  size={13}
                  onClick={() => downloadFile(item)}
                  className="text-success-500 cursor-pointer transition-all hover:scale-125"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploaderField;
