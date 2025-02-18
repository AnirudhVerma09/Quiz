import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://opentdb.com" }),
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: ({ amount = 10, category }) =>
        `/api.php?amount=${amount}&category=${category}&type=multiple`,
    }),
    getCategories: builder.query({
      query: () => `/api_category.php`,
    }),
  }),
});

export const { useGetQuestionsQuery, useGetCategoriesQuery } = quizApi;
