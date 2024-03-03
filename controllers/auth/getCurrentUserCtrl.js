export const getCurrentUserCtrl = async (req, res) => {
    return res.send(res.locals.user)
};
