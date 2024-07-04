import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const botApi = createApi({
  reducerPath: "api/bot",
  tagTypes: ["Bots"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    fetchSingleBot: builder.query({
      query: ({ email, id }) => ({
        url: `bots/${id}?email=${encodeURIComponent(email)}`,
        method: "GET",
      }),
      providesTags: ["Bots"],
    }),
    fetchAllBots: builder.query({
      query: (email) => ({
        url: `bots?email=${encodeURIComponent(email)}`,
        method: "GET",
      }),
      providesTags: ["Bots"],
    }),
    createBot: builder.mutation({
      query: (data) => ({
        url: "bots",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Bots"],
    }),
    updateBot: builder.mutation({
      query: ({ data, id }) => ({
        url: `bots/${id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Bots"],
    }),
    deleteBot: builder.mutation({
      query: ({id, email}) => ({
        url: `bots/${id}`,
        method: "DELETE",
        body: {email}
      }),
      invalidatesTags: ["Bots"],
    }),
  }),
});

export const {
  useFetchSingleBotQuery,
  useFetchAllBotsQuery,
  useCreateBotMutation,
  useUpdateBotMutation,
  useDeleteBotMutation,
} = botApi;
