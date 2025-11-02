const useExpress = require("express");

const app = useExpress();

app.listen(3000, () => {
  console.log('listening on 3000 port')
});

// app.get, delete, post, patch callback functions are the route handlers

app.get("/users", (req, res) => {
  res.send({ name: "Ashok", age: 32 })
});

app.get("/users/:userId", (req, res) => {
  res.send({ name: "Ashok", age: 32, userId: req.params })
});



app.post("/users", (req, res) => {
  res.send("User created successfully")
});

app.delete("/users", (req, res) => {
  res.send("user deleted")
});

app.use("/users", (req, res) => {
  res.send("on users")
})

app.use("/login", (req, res) => {
  res.send("login page")
})


// multi routing use next
app.get("/userprofile", (req, res, next) => {
  console.log("route 1")
  next()
  // res.send("Route 1")
},
  (req, res, next) => {
    console.log("route 2")
    //res.send("Route 2")
    next()
  },
  (req, res) => {
    console.log("route 3")
    res.send("Route 3")
  }
)