import { useGet } from "#base/src/helpers/api/useGet";
import { usePost } from "#base/src/helpers/api/usePost";
import { usePut } from "#base/src/helpers/api/usePut";
import { useDelete } from "#base/src/helpers/api/useDelete";
import { useQuery } from "@tanstack/react-query";
import { getMethod } from "#base/src/helpers/api/Interseptor/RequestMethods";
import type { Assessment } from "../seed/assessmentsSeed";

const ASSESSMENTS_API_BASE = "/assessments";
const ASSESSMENTS_QUERY_KEY = "assessments";

/**
 * Hook to get all assessments
 */
export const useGetAllAssessments = (enabled: boolean = true) => {
  return useGet(ASSESSMENTS_API_BASE, [ASSESSMENTS_QUERY_KEY], enabled);
};

/**
 * Hook to get assessment by job ID
 */
export const useGetAssessmentByJobId = (
  jobId: string | undefined,
  enabled: boolean = true
) => {
  return useQuery<Assessment | undefined>({
    queryKey: [ASSESSMENTS_QUERY_KEY, "byJobId", jobId],
    queryFn: async () => {
      if (!jobId) return undefined;
      const response = await getMethod(`${ASSESSMENTS_API_BASE}/${jobId}`);
      return response;
    },
    enabled: enabled && !!jobId,
  });
};

/**
 * Hook to create a new assessment
 */
export const useCreateAssessment = () => {
  return usePost(ASSESSMENTS_API_BASE, [ASSESSMENTS_QUERY_KEY]);
};

/**
 * Hook to update an assessment
 */
export const useUpdateAssessment = (jobId: string) => {
  return usePut(`${ASSESSMENTS_API_BASE}/${jobId}`, [ASSESSMENTS_QUERY_KEY]);
};

/**
 * Hook to submit assessment responses
 */
export const useSubmitAssessmentResponse = (jobId: string) => {
  return usePost(`${ASSESSMENTS_API_BASE}/${jobId}/submit`, [
    ASSESSMENTS_QUERY_KEY,
    "responses",
  ]);
};

/**
 * Hook to delete an assessment
 */
export const useDeleteAssessment = () => {
  return useDelete(ASSESSMENTS_API_BASE, [ASSESSMENTS_QUERY_KEY]);
};
