const userAuth = (req, res, next) => {
    const token = 'xyz1'
    if (token !== 'xyz') {
        res.status(401).send("unauthorized user")
    } else {
        next();
    }
}

module.exports = {
    userAuth
}