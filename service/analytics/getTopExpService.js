import ExpenseModel from "../../models/Expense.js";


// Top 10 Expenses
export const getTopExpService = async (limit) => {
    const top10Expenses = await ExpenseModel.aggregate([
        { $sort: { amount: -1 } },
        { $limit: limit },
        {
            $project: {
                amount: 1,
                description: 1,
                category: 1,
                expenseType: 1
            },
        },
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
                expenses: { $push: "$$ROOT" }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                count: 1,
                totalAmount: 1,
                expenses: 1
            }
        }
    ]);

    return top10Expenses
}
