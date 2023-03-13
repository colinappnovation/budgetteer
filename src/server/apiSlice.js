import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getBudgetMonths,
  getExpensesForBudgetId,
  getTotalExpenses,
  getPredictedBudgetTotal,
  getBudgetItemsForBudgetMonth,
} from ".";

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
      queryFn: async (monthId = 0) => {
        const { exps, error } = await getTotalExpenses(monthId);
        const data = exps.data.reduce((acc, cv) => acc + cv.Amt, 0);
        return { data, error };
      },
    }),
    getRunningTotals: builder.query({
      queryFn: async (monthId = 0) => {
        const exps = await getTotalExpenses(monthId);
        const sum = exps.data?.reduce((acc, cv) => acc + cv.Amt, 0);

        const bg = await getPredictedBudgetTotal(monthId);
        const bgSum = bg.data?.reduce((accPB, cvPB) => accPB + cvPB.Max, 0);
        return { data: { spent: sum, budgetted: bgSum } };
      },
    }),
    getBudgetItems: builder.query({
      queryFn: async (monthId = 0) => {
        const { data, error } = await getBudgetItemsForBudgetMonth(monthId);
        return { data, error };
      },
    }),
    getExpensesForBudgetAndMonth: builder.query({
      queryFn: async ({monthId = 0, budgetId = 0}) => {
        const { data, error } = await getExpensesForBudgetId(budgetId, monthId);
        const totalSpent = data.reduce((acc, cv) => acc+ cv.Amt, 0 );
        return { data: { expenses: data, totalSpent}, error };
      },
    }),
  }),
});

export const {
  useGetMonthsQuery,
  useGetTotalOfExpensesQuery,
  useGetRunningTotalsQuery,
  useGetBudgetItemsQuery,
  useGetExpensesForBudgetAndMonthQuery,
} = budgetApi;
