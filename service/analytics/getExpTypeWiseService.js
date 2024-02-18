import ExpenseModel from "../../models/Expense.js";
import ExpenseTypeModel from "../../models/ExpenseType.js";


export const getExpTypeWiseService = async () => {
    const expenses = await ExpenseModel.aggregate([
        {
            $sort: { date_sl: -1 }
        },
        {
            $group: {
                _id: "$expenseType",
                count: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
                expenses: { $push: "$$ROOT" }
            }
        }
    ]);

    const enrichedExpenses = await Promise.all(expenses.map(async (expense) => {
        const expenseTypeDetails = await ExpenseTypeModel.findById(expense._id);
        return {
            ...expense,
            expenseTypeName: expenseTypeDetails ? expenseTypeDetails.name : null,
            expenseTypeIcon: expenseTypeDetails ? expenseTypeDetails.icon : null,
        };
    }));

    return enrichedExpenses;
};