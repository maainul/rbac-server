import ExpenseModel from "../../models/Expense.js";


// Get Current Year Expense
export const getCurYearExpService = async (sortBy) => {
    const today = new Date();
    const fdmt = new Date(today.getFullYear(), 0, 1).getTime()
    const ldmt = new Date(today.getFullYear(), 11, 31).getTime();
    const expThisMonth = await ExpenseModel.aggregate([
        { $sort: { date_sl: -1 } },
        {
            $match: {
                date_sl: {
                    $gte: fdmt,
                    $lte: ldmt
                }
            }
        },
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
                _id: null,
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
                expenses: { $push: "$$ROOT" }
            }
        },
        {
            $project: {
                _id: 0,
                totalAmount: 1,
                expenses: 1,
                count: 1
            }
        }
    ])
    return expThisMonth
}