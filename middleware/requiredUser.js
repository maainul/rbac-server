
// Middleware function to check if user is authenticated
const requireUser = (req, res, next) => {
    const user = res.locals.user; // Access user data from res.locals


    if (!user) {
        return res.status(401).send("Unauthorized");
    }
    // User is authenticated, proceed to next middleware
    return next();
};


export default requireUser