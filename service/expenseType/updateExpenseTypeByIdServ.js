import ExpenseTypeModel from "../../models/ExpenseType.js"


export const updateExpenseTypeByIdServ = async ({ id, name, icon }) => {
    const expTyp = ExpenseTypeModel.findByIdAndUpdate(id, { name, icon }, { new: true })
    return expTyp
}

