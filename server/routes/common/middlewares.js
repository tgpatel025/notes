const isAuthenticated = (req, res, next) => {
    if (req.session.user) return next();
    res.status(401).json({ message: "User is not authenticated to perform this action." });
};

module.exports = {
    isAuthenticated,
};
