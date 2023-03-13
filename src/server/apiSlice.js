import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBudgetMonths, getExpensesForBudgetId, getTotalExpenses, getPredictedBudgetTotal } from ".";

// Define a service using a base URL and expected endpoints
export const budgetApi = createApi({
  reducerPath: "budgetApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getMonths: builder.query({
      queryFn: async () => {
        const { data, error } = await getBudgetMonths();
        return { data, error };
      },
    }),
    getTotalOfExpenses: builder.query({
      queryFn: async (budgetId = 0) => {
        const { data, error } = await getExpensesForBudgetId(budgetId);
        const totalOfExpenses = data.reduce((acc, cv) => acc + cv.Amt, 0);
        return { data: totalOfExpenses, error };
      },
    }),
    getRunningTotals: builder.query({
      queryFn: async (monthSelectedId = 0) => {
        const exps = await getTotalExpenses(monthSelectedId);
        const sum = exps.data?.reduce((acc, cv) => acc + cv.Amt, 0);
    
        const bg = await getPredictedBudgetTotal(monthSelectedId);
        const bgSum = bg.data?.reduce((accPB, cvPB) => accPB + cvPB.Max, 0);

        console.log({sum, bgSum});
    
        return { data: {spent: sum, budgetted: bgSum }};
      },
    }),
  }),
});

export const { useGetMonthsQuery, useGetTotalOfExpensesQuery, useGetRunningTotalsQuery } = budgetApi;
