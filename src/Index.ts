import express from "express"

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello world"
    })
});

app.listen(3000, () => console.log("Open and clear"));