import app from "./app";

const port = parseInt(`${process.env.PORT}`);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
