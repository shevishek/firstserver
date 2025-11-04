import { users } from "../users.js";

export const getAllUsers=('/', (req, res) => {
   res.json(users);
});

export const signin=('/:code', (req, res) => {
  const {sisma}=req.body;
  const b = users.find(x => x.code == req.params.code);
  if(!b ||sisma!=b.sisma)
    return res.status(401).json({ message: "Invalid credentials" });
  if(sisma==b.sisma)
    res.json(b);
});

export const signup=('/', (req, res) => {
  const { code, name, email, sisma, bookinlend} = req.body
  const user=
  {
    code,
    name,
    email,
    sisma,
    bookinlend
  }
  users.push(user)
  res.status(201).json(user);
});
