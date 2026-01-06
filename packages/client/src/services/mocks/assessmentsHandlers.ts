import { http, HttpResponse, type HttpHandler } from "msw";
import {
  getAssessmentByJobId,
  saveAssessment,
  submitAssessmentResponse,
  getAllAssessments,
  deleteAssessment,
} from "../db/assessmentsDb";
import { delay, maybeFail } from "../../utils/latency";

export const assessmentsHandlers: HttpHandler[] = [
  http.get("/assessments", async ({ request }) => {
    await delay();

    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const pageSize = url.searchParams.get("pageSize");

    const assessments = await getAllAssessments({
      page: page ? parseInt(page) : undefined,
      pageSize: pageSize ? parseInt(pageSize) : undefined,
    });

    return HttpResponse.json(assessments);
  }),

  http.post("/assessments", async ({ request }) => {
    await delay();
    maybeFail();

    const assessmentData = (await request.json()) as any;
    // console.log("assessmentData", assessmentData);

    const savedAssessment = await saveAssessment(assessmentData);
    // console.log("savedAssessment", savedAssessment);

    return HttpResponse.json(savedAssessment);
  }),

  http.get("/assessments/:jobId", async ({ params }) => {
    await delay();
    console.log("getAssessmentByJobId", params.jobId);

    const assessment = await getAssessmentByJobId(params.jobId as string);
    return HttpResponse.json(assessment);
  }),

  http.put("/assessments/:jobId", async ({ request }) => {
    await delay();
    maybeFail();

    const assessmentData = (await request.json()) as any;
    const savedAssessment = await saveAssessment(assessmentData);
    return HttpResponse.json(savedAssessment);
  }),

  http.post("/assessments/:jobId/submit", async ({ params, request }) => {
    await delay();
    maybeFail();

    const responses = (await request.json()) as any;
    const result = await submitAssessmentResponse(
      params.jobId as string,
      responses
    );
    return HttpResponse.json(result);
  }),

  http.delete("/assessments/:id", async ({ params }) => {
    await delay();
    maybeFail();
    await deleteAssessment(params.id as string);
    return new HttpResponse(null, { status: 204 });
  }),
];
