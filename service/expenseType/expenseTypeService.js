import { getExpenseTypeByIdServ } from "./getExpenseTypeByIdServ.js";
import { getAllExpTypeServ } from './getAllExpTypeServ.js';
import { createExpTypeServ } from './createExpTypeServ.js';
import { updateExpenseTypeByIdServ } from './updateExpenseTypeByIdServ.js';
import { deleteExpenseTypeServ } from './deleteExpTypeServ.js';


export const expenseTypeService = {
    getExpenseTypeByIdServ,
    getAllExpTypeServ,
    createExpTypeServ,
    updateExpenseTypeByIdServ,
    deleteExpenseTypeServ
}
