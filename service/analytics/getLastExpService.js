import ExpenseModel from "../../models/Expense.js"


// Get Last Expenses : Dynamic : Pass ASC,DESC and LIMIT
export const getLastExpService = async (st, limit) => {
    const lastExps = await ExpenseModel.aggregate([
        { $sort: { date_sl: st } },
        { $limit: 20 },
        {
            $project: {
                amount: 1,
                description: 1,
                category: 1,
                expenseType: 1,
                date: 1
            }
        },
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
                expenses: { $push: "$$ROOT" }
            }
        },

    ])
    return lastExps
}