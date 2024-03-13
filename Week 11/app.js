import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/showemail", (req, res) => {
    const email = req.body["exampleInputEmail1"];
    console.log(email);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
