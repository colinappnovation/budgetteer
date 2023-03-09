import { createClient } from "@supabase/supabase-js";

const useSupabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getBudgetMonths() {
  return useSupabase.from("BudgetMonth").select();
}

export async function getBudgetItemsForBudgetMonth(id = 0) {
  return useSupabase.from("Budget").select().eq("BudgetMonth", id);
}

export async function getExpensesForBudgetId(id = 0) {
  return useSupabase.from("Expenses").select().eq("BudgetItem", id);
}

export async function addExpense({ name, desc, amt, id }) {
  return useSupabase
    .from("Expenses")
    .insert([
      {
        Name: name,
        Description: desc,
        Amt: amt,
        BudgetItem: id,
      },
    ])
}

export default useSupabase;
