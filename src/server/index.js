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

export async function getExpensesForBudgetId(id = 0, mid = 0) {
  return useSupabase.from("Expenses").select().eq("BudgetItem", id).eq('BudgetMonth', mid);
}

export async function addExpense({ name, desc, amt, id, mid }) {
  return useSupabase
    .from("Expenses")
    .insert([
      {        
        Name: name,
        Description: desc,
        Amt: amt,
        BudgetItem: id,
        BudgetMonth: mid
      },
    ])
}

export async function getTotalExpenses(id = 0) {
  return useSupabase
    .from("Expenses")
    .select('Amt')
    .eq("BudgetMonth", id);
}

export async function getPredictedBudgetTotal(id) {
  return useSupabase
    .from("Budget")
    .select('Max')
    .eq("BudgetMonth", id)
}

export default useSupabase;
