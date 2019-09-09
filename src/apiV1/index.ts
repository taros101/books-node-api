import { Router } from "express";
import auth from "./auth/auth.route";
import users from "./users/user.route";
import books from "./books/books.route";
import usersRoles from "./users-roles/users-roles.route";
import usersInRoles from "./usersInRoles/usersInRoles.route";
import admin from "./admin/admin.route";

const router: Router = Router();

router.use("/env", (req, res) => {
  res.json(process.env);
});
router.use("/", auth);
router.use("/users", users);
router.use("/books", books);
router.use("/users-roles", usersRoles);
router.use("/users-in-roles", usersInRoles);
router.use("/admin", admin);

export default router;
