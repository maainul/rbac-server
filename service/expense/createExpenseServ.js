
import { saveToDb } from './../../utils/saveUtils.js';
import ExpenseModel from '../../models/Expense.js';
import { serv } from './../services.js';

export const createExpenseServ = async ({ amount,
    date,
    description,
    category,
    expenseType,
    userid }) => {
    const expense = await saveToDb(ExpenseModel, {
        amount,
        date,
        description,
        category,
        expenseType,
        userid
    })
    // Call Expense Type Service To Find Expens Type Info By ID
    const id = expense.expenseType
    const expenseTypeDetails = await serv.expenseTypeService.getExpenseTypeByIdServ({ id })
    return {
        ...expense.toObject(),
        expenseType: expenseTypeDetails
    }
}
