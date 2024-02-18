import ExpenseModel from "../../models/Expense.js"
import ExpenseTypeModel from "../../models/ExpenseType.js"
import moment from 'moment/moment.js';


// Helper Function For ExpenseDetails with ExpenseType
const mapExpenseTypeToExpenses = (expenses, expenseTypeDetails) => {
    return expenses.map(expense => {
        const correspondingExpenseType = expenseTypeDetails.find(et => et._id.toString() === expense.expenseType);
        return {
            ...expense.toObject(),
            expenseType: correspondingExpenseType, // Replace the string ID with ExpenseType details
        };
    });
};


export const getAllExpenseService = async ({ frequency, userid, firstDate, secondDate, categoryFilter, expenseTypeFilter }) => {
    const expenses = await ExpenseModel.find({
        ...(frequency !== 'custom' ? {
            date: {
                $gt: moment().subtract(Number(frequency), 'd').toDate(),
            },
        } : {
            date: {
                $gte: firstDate,
                $lte: secondDate,
            }
        }),

        userid: userid,
        ...(categoryFilter !== 'all' && { category: categoryFilter }),
        ...(expenseTypeFilter !== 'all' && { expenseType: expenseTypeFilter })
    })
    // Extract expenseTypeIds from expenses
    const expenseTypeIds = expenses.map(expense => expense.expenseType)

    // Fetch Expense Type details and map them to expenses
    const expenseTypes = await ExpenseTypeModel.find({ _id: { $in: expenseTypeIds } })
    const expenseTypeDetails = expenseTypes.map((expenseType) => ({
        _id: expenseType._id,
        name: expenseType.name,
        icon: expenseType.icon
    }))
    const expensesWithExpenseType = mapExpenseTypeToExpenses(expenses, expenseTypeDetails)

    return expensesWithExpenseType;
};

