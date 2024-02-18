import ExpenseTypeModel from "../../models/ExpenseType.js"
import { saveToDb } from './../../utils/saveUtils.js';


export const createExpTypeServ = async ({ name, icon }) => {
    const expTyp = await saveToDb(ExpenseTypeModel, { name, icon })
    return expTyp
}

