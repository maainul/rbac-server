import ExpenseTypeModel from "../../models/ExpenseType.js"


export const getExpenseTypeByIdServ = async ({ id }) => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(id)
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")

    const expTyp = ExpenseTypeModel.findById(id)
    return expTyp
}

