

// Current Month Data
export const getCurMonthExpService = async () => {
    const today = new Date();
    const fdmt = new Date(today.getFullYear(), today.getMonth(), 1).getTime()
    const ldmt = new Date(today.getFullYear(), today.getMonth() + 1, 0).getTime();
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
                // _id: "$category", // if id = category then it will give category wise data
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