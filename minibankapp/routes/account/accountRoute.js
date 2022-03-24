"use strict";

const express = require("express");
const path = require("path");
const accountRouter = express.Router();
const accountDAO = require("../../dao/AccountDAO");
const Account = require("../../model/Account");
const accountController = require("../../controller/accountController");
const accountRestController = require("../../controller/accountRestController");

accountRouter.get("/", async (req, res) => {
  res.render("account.pug", { accounts: await accountController.findAll() });
});

accountRouter.post("/add", (req, res, next) => {
  accountController.create(
    new Account(
      req.body.txtAccountNo,
      req.body.ddlAccountType,
      req.body.txtCustomerName
    )
  );
  res.redirect("back");
});

//API
accountRouter.post("/api/accounts", accountRestController.create);
accountRouter.get("/api/accounts", accountRestController.find);
accountRouter.put("/api/accounts/:id", accountRestController.update);
accountRouter.delete("/api/accounts", accountRestController.delete);

module.exports = accountRouter;
