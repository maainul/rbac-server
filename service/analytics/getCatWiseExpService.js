import ExpenseModel from "../../models/Expense.js"

// Expense Categorywise Expense
export const getCatWiseExpService = async () => {
    const expCatWiseExp = await ExpenseModel.aggregate([
        { $sort: { date_sl: -1 } },
        {
            $project: {
                amount: 1,
                description: 1,
                category: 1,
                expenseType: 1,
                date: 1
            },
        },
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
                expenses: { $push: "$$ROOT" }
            }
        }
    ])
    return expCatWiseExp
}
