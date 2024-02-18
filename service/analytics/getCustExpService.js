import ExpenseModel from "../../models/Expense.js"


// Expense Find With Custom parameter
export const getCustExpService = async (category, sortOrder, expenseType, yearFilter, monthFilter) => {
    let so = 'desc'
    let query = {}
    // category 
    if (category === "credit" || category === "debit") {
        query.category = category
    }
    // default sort : desc
    if (sortOrder) {
        so = sortOrder
    }

    // expense type id
    if (expenseType) {
        query.expenseType = expenseType
    }

    // year Filter
    if (yearFilter) {
        const fdyt = new Date(2023, 0, 1);
        const ldyt = new Date(2023, 11, 31, 23, 59, 59, 999);
        query.date_sl = {
            $gte: fdyt.getTime(),
            $lte: ldyt.getTime()
        }
    }

    // month Filter
    if (monthFilter) {
        const fdmt = new Date(yearFilter || new Date().getFullYear(), monthFilter - 1, 1)
        const ldmt = new Date(yearFilter || new Date().getFullYear(), monthFilter, 0)

        fdmt.setUTCHours(0, 0, 0, 0); // 12 AM 0:0:0
        ldmt.setUTCHours(23, 59, 59, 0);
        query.date_sl = {
            ...query.date_sl,
            $gte: fdmt.getTime(),
            $lte: ldmt.getTime()
        }
    }

    const custExp = await ExpenseModel.find(query)
        .populate('expenseType', 'name icon') // Populate the 'expenseType' field with 'name' and 'icon'
        .sort({ date_sl: so })
    return custExp
}