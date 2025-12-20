# راهنمای استفاده از Assessments API

این فایل نحوه استفاده از API Hooks برای Assessments را توضیح می‌دهد.

## Import کردن Hooks

```typescript
import {
  useGetAllAssessments,
  useGetAssessmentByJobId,
  useCreateAssessment,
  useUpdateAssessment,
  useSubmitAssessmentResponse,
  useDeleteAssessment,
} from "src/services/api/assessmentsApi";
```

## 1. دریافت همه Assessments (GET)

```typescript
const {
  data,           // داده‌های برگشتی: { data: Assessment[], total: number }
  isLoading,      // آیا در حال بارگذاری است؟
  isError,        // آیا خطا رخ داده؟
  error,          // شیء خطا
  refetch,        // تابع برای refresh کردن داده
} = useGetAllAssessments();

// استفاده:
useEffect(() => {
  if (data) {
    console.log("Assessments:", data.data);
    console.log("Total:", data.total);
  }
}, [data]);
```

## 2. دریافت Assessment بر اساس JobId (GET)

```typescript
const jobId = "job-1";

const {
  data: assessment,  // Assessment | undefined
  isLoading,
  isError,
  refetch,
} = useGetAssessmentByJobId(jobId, true); // enabled: true

// استفاده:
if (assessment) {
  console.log("Title:", assessment.title);
  console.log("Sections:", assessment.sections);
}
```

## 3. ایجاد Assessment جدید (POST)

```typescript
const { mutate: createAssessment, isPending } = useCreateAssessment();

// استفاده:
const handleCreate = () => {
  const newAssessment = {
    id: "assessment-job-4",
    jobId: "job-4",
    title: "عنوان جدید",
    description: "توضیحات",
    sections: [
      {
        id: "section-0",
        title: "بخش اول",
        questions: [
          {
            id: "q-0-0",
            type: "single-choice",
            question: "سوال؟",
            options: ["گزینه 1", "گزینه 2"],
            required: true,
          },
        ],
      },
    ],
    createdAt: new Date(),
  };

  createAssessment(newAssessment, {
    onSuccess: (data) => {
      toast.success("با موفقیت ایجاد شد");
      // Query keys به صورت خودکار invalidate می‌شوند
    },
    onError: (error) => {
      toast.error("خطا در ایجاد");
    },
  });
};
```

## 4. آپدیت Assessment (PUT)

```typescript
const jobId = "job-1";
const { mutate: updateAssessment, isPending } = useUpdateAssessment(jobId);

// استفاده:
const handleUpdate = () => {
  const updatedData = {
    ...existingAssessment,
    title: "عنوان جدید",
  };

  updateAssessment(updatedData, {
    onSuccess: () => {
      toast.success("با موفقیت آپدیت شد");
    },
    onError: (error) => {
      toast.error("خطا در آپدیت");
    },
  });
};
```

## 5. ارسال پاسخ‌های Assessment (POST)

```typescript
const jobId = "job-1";
const { mutate: submitResponse, isPending } = useSubmitAssessmentResponse(jobId);

// استفاده:
const handleSubmit = () => {
  const responses = {
    "q-0-0": "پاسخ سوال اول",
    "q-0-1": "پاسخ سوال دوم",
    "q-1-0": ["گزینه 1", "گزینه 2"], // برای multi-choice
  };

  submitResponse(responses, {
    onSuccess: () => {
      toast.success("پاسخ‌ها با موفقیت ارسال شدند");
    },
    onError: (error) => {
      toast.error("خطا در ارسال پاسخ‌ها");
    },
  });
};
```

## 6. حذف Assessment (DELETE)

```typescript
const { mutate: deleteAssessment, isPending } = useDeleteAssessment();

// استفاده:
const handleDelete = (assessmentId: string) => {
  deleteAssessment(assessmentId, {
    onSuccess: () => {
      toast.success("با موفقیت حذف شد");
    },
    onError: (error) => {
      toast.error("خطا در حذف");
    },
  });
};
```

## مثال کامل استفاده در کامپوننت

```typescript
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllAssessments,
  useGetAssessmentByJobId,
  useCreateAssessment,
} from "src/services/api/assessmentsApi";

const MyComponent = () => {
  const [selectedJobId, setSelectedJobId] = useState<string>();

  // دریافت همه assessments
  const { data, isLoading, refetch } = useGetAllAssessments();

  // دریافت assessment خاص
  const { data: assessment } = useGetAssessmentByJobId(
    selectedJobId,
    !!selectedJobId
  );

  // ایجاد assessment
  const { mutate: createAssessment } = useCreateAssessment();

  const handleCreate = () => {
    createAssessment(
      {
        id: `assessment-${Date.now()}`,
        jobId: "job-4",
        title: "جدید",
        description: "توضیحات",
        sections: [],
        createdAt: new Date(),
      },
      {
        onSuccess: () => {
          toast.success("ایجاد شد");
          refetch(); // Refresh لیست
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.data?.map((assessment) => (
        <div key={assessment.id}>{assessment.title}</div>
      ))}
      <button onClick={handleCreate}>ایجاد جدید</button>
    </div>
  );
};
```

## نکات مهم

1. **Query Keys**: تمام hooks به صورت خودکار query keys را invalidate می‌کنند بعد از mutation
2. **Error Handling**: همیشه `onError` را handle کنید
3. **Loading States**: از `isPending` و `isLoading` برای نمایش loading استفاده کنید
4. **Refetch**: می‌توانید از `refetch()` برای refresh دستی استفاده کنید
5. **Enabled**: می‌توانید با پارامتر `enabled` کنترل کنید که query اجرا شود یا نه

## Endpoints

- `GET /assessments` - دریافت همه assessments
- `GET /assessments/:jobId` - دریافت assessment بر اساس jobId
- `POST /assessments` - ایجاد assessment جدید
- `PUT /assessments/:jobId` - آپدیت assessment
- `POST /assessments/:jobId/submit` - ارسال پاسخ‌های assessment
- `DELETE /assessments/:id` - حذف assessment

