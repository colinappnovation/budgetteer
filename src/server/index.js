import { createClient } from "@supabase/supabase-js";

const useSupabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getBudgetMonths() {
    return useSupabase.from('BudgetMonth').select()
}

export async function getBudgetItemsForBudgetMonth(id = 0) {
    return useSupabase.from('Budget').select().eq('BudgetMonth', id)
}



export default useSupabase;
