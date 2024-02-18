
export const saveToDb = async (model, fields) => {
    const data = await model(fields).save()
    return data
}
