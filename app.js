const useExpress = require("express");

const app = useExpress();

app.listen(3000, () => {
    console.log('listening on 3000 port')
});

app.use("/users", (req, res) => {
    res.send("on users")
})

app.use("/login", (req, res) => {
    res.send("login page")
})