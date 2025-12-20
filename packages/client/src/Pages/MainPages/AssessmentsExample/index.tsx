import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllAssessments,
  useGetAssessmentByJobId,
  useCreateAssessment,
  useUpdateAssessment,
  useSubmitAssessmentResponse,
  useDeleteAssessment,
} from "src/services/api/assessmentsApi";

/**
 * مثال کامل استفاده از API Hooks برای Assessments
 */
const AssessmentsExample = () => {
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>();

  // 1. دریافت همه assessments
  const {
    data: assessmentsData,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    refetch: refetchAll,
  } = useGetAllAssessments();

  // 2. دریافت assessment بر اساس jobId
  const {
    data: assessment,
    isLoading: isLoadingSingle,
    isError: isErrorSingle,
  } = useGetAssessmentByJobId(selectedJobId, !!selectedJobId);

  // 3. ایجاد assessment جدید
  const { mutate: createAssessment, isPending: isCreating } =
    useCreateAssessment();

  // 4. آپدیت assessment
  const { mutate: updateAssessment, isPending: isUpdating } =
    useUpdateAssessment(selectedJobId || "");

  // 5. ارسال پاسخ‌های assessment
  const { mutate: submitResponse, isPending: isSubmitting } =
    useSubmitAssessmentResponse(selectedJobId || "");

  // 6. حذف assessment
  const { mutate: deleteAssessment, isPending: isDeleting } =
    useDeleteAssessment();

  // Handler برای ایجاد assessment
  const handleCreateAssessment = () => {
    const newAssessment = {
      id: `assessment-job-${Date.now()}`,
      jobId: "job-4",
      title: "Assessment جدید",
      description: "توضیحات assessment جدید",
      sections: [
        {
          id: "section-0",
          title: "بخش اول",
          questions: [
            {
              id: "q-0-0",
              type: "single-choice" as const,
              question: "سوال اول؟",
              options: ["گزینه 1", "گزینه 2", "گزینه 3"],
              required: true,
            },
          ],
        },
      ],
      createdAt: new Date(),
    };

    createAssessment(newAssessment, {
      onSuccess: (data) => {
        toast.success("Assessment با موفقیت ایجاد شد");
        refetchAll(); // Refresh لیست
      },
      onError: (error) => {
        toast.error("خطا در ایجاد assessment");
        console.error(error);
      },
    });
  };

  // Handler برای آپدیت assessment
  const handleUpdateAssessment = () => {
    if (!assessment) return;

    const updatedAssessment = {
      ...assessment,
      title: "عنوان آپدیت شده",
    };

    updateAssessment(updatedAssessment, {
      onSuccess: (data) => {
        toast.success("Assessment با موفقیت آپدیت شد");
        refetchAll();
      },
      onError: (error) => {
        toast.error("خطا در آپدیت assessment");
        console.error(error);
      },
    });
  };

  // Handler برای ارسال پاسخ‌ها
  const handleSubmitResponse = () => {
    if (!selectedJobId) return;

    const responses = {
      "q-0-0": "گزینه 1",
      "q-0-1": "پاسخ متن",
    };

    submitResponse(responses, {
      onSuccess: (data) => {
        toast.success("پاسخ‌ها با موفقیت ارسال شدند");
      },
      onError: (error) => {
        toast.error("خطا در ارسال پاسخ‌ها");
        console.error(error);
      },
    });
  };

  // Handler برای حذف assessment
  const handleDeleteAssessment = (assessmentId: string) => {
    deleteAssessment(assessmentId, {
      onSuccess: () => {
        toast.success("Assessment با موفقیت حذف شد");
        refetchAll();
      },
      onError: (error) => {
        toast.error("خطا در حذف assessment");
        console.error(error);
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        مثال استفاده از Assessments API
      </h1>

      {/* نمایش لیست assessments */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">لیست Assessments</h2>
        {isLoadingAll ? (
          <p>در حال بارگذاری...</p>
        ) : isErrorAll ? (
          <p className="text-red-500">خطا در دریافت داده‌ها</p>
        ) : (
          <div className="space-y-4">
            {assessmentsData?.data?.map((assessment: any) => (
              <div
                key={assessment.id}
                className="border p-4 rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedJobId(assessment.jobId)}
              >
                <h3 className="font-bold">{assessment.title}</h3>
                <p className="text-sm text-gray-600">
                  {assessment.description}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Job ID: {assessment.jobId}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAssessment(assessment.id);
                  }}
                  disabled={isDeleting}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                >
                  {isDeleting ? "در حال حذف..." : "حذف"}
                </button>
              </div>
            ))}
            {assessmentsData?.data?.length === 0 && (
              <p>هیچ assessmentی یافت نشد</p>
            )}
          </div>
        )}
      </div>

      {/* نمایش assessment انتخاب شده */}
      {selectedJobId && (
        <div className="mb-8 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">
            Assessment برای Job: {selectedJobId}
          </h2>
          {isLoadingSingle ? (
            <p>در حال بارگذاری...</p>
          ) : isErrorSingle ? (
            <p className="text-red-500">خطا در دریافت assessment</p>
          ) : assessment ? (
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold text-lg">{assessment.title}</h3>
              <p className="text-gray-600 mt-2">{assessment.description}</p>
              <div className="mt-4">
                <h4 className="font-semibold">بخش‌ها:</h4>
                {assessment.sections?.map((section: any) => (
                  <div key={section.id} className="mt-2 ml-4">
                    <p className="font-medium">{section.title}</p>
                    <p className="text-sm text-gray-500">
                      {section.questions?.length} سوال
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Assessment یافت نشد</p>
          )}
        </div>
      )}

      {/* دکمه‌های عملیات */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={handleCreateAssessment}
          disabled={isCreating}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isCreating ? "در حال ایجاد..." : "ایجاد Assessment جدید"}
        </button>

        {selectedJobId && (
          <>
            <button
              onClick={handleUpdateAssessment}
              disabled={isUpdating || !assessment}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {isUpdating ? "در حال آپدیت..." : "آپدیت Assessment"}
            </button>

            <button
              onClick={handleSubmitResponse}
              disabled={isSubmitting}
              className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال پاسخ‌ها"}
            </button>
          </>
        )}

        <button
          onClick={() => refetchAll()}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Refresh لیست
        </button>
      </div>

      {/* نمایش داده‌های خام برای debug */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
          {JSON.stringify(
            {
              assessmentsData,
              assessment,
              selectedJobId,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

export default AssessmentsExample;
