import ExpenseModel from "../../models/Expense.js"


// Current Week
export const getCurrentWeekExpService = async (str, end) => {
    const curWeekexp = await ExpenseModel.find({
        date_sl: {
            $gte: str,
            $lte: end
        }
    })
    return curWeekexp
}
