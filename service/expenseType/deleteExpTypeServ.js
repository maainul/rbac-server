import ExpenseTypeModel from "../../models/ExpenseType.js"


export const deleteExpenseTypeServ = async ({ id }) => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(id)
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")

    const expTyp = ExpenseTypeModel.findByIdAndDelete(id)
    return expTyp
}

