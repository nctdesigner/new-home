try {
  const router = require("express").Router();
  const users = require("../models/user-model");
  const refCodes = require("../models/codes-model");
  const teams = require("../models/team-model");
  const { addTeam, updateTeam } = require("../../controllers/teams-controller");
  const {
    getUsers,
    updateUsers,
  } = require("../../controllers/users-controller");
  const { addCode } = require("../../controllers/codes-controller");
  const { body, header, validationResult } = require("express-validator");
  const jwt = require("jsonwebtoken");
  const verifyUser = require("../middlewares/verify-jwt-token");
  const encrypter = require("../../lib/encryption/encrypter");
  const decrypter = require("../../lib/decryption/decrypter");
  const dotenv = require("dotenv");

  dotenv.config();
  const jwt__Key = process.env.NCT_JWT_KEY;

  router.get(
    "/refercode",
    verifyUser,
    [
      header("referCode", "Please provide valid email...").isLength({ min: 6 }),
      header("auth-token", "Please provide valid password...").isLength(),
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(411).json({
          id: 2,
          statusCode: 411,
          message: "Please provide valid credentials...",
          errors: errors.array(),
          password: process.env.CLIENT_PASSWORD,
        });
      } else if (errors.isEmpty()) {
        try {
          if (req.header("serverPass") === process.env.SERVER_PASSWORD) {
            const user = await users
              .findById(req.credentials.id)
              .select("-_password");

            if (user) {
              if (user._referCode !== "") {
                return res.status(400).json({
                  id: 20,
                  statusCode: 400,
                  message: "Refer code already generated...",
                  password: process.env.CLIENT_PASSWORD,
                });
              } else if (user._referCode === "") {
                const { newTeam, teamErrr } = await addTeam({
                  teamName: req.header("referCode").trim(),
                  id: user._id,
                  teamPassword: "123456789",
                });
                if (teamErrr) {
                  return res.status(400).json({
                    id: 20,
                    statusCode: 400,
                    message: teamErrr,
                    password: process.env.CLIENT_PASSWORD,
                  });
                } else {
                  const { codeErr } = await addCode({
                    id: user._id,
                    value: req.header("referCode").trim(),
                    teamId: newTeam._id,
                    teamPassword: "123456789",
                  });
                  if(codeErr) {
                    return res.status(400).json({
                        id: 20,
                        statusCode: 400,
                        message: codeErr,
                        password: process.env.CLIENT_PASSWORD,
                      });
                  }

                  const userUpdates = {
                    _referCode: req.header("referCode").trim(),
                    _ownTeamId: newTeam._id,
                    _ownTeamRole: "admin",
                    _ownTeamPassword: "123456789",
                  };
                  const { updatedUser, errrrr } = await updateUsers({
                    id: user._id,
                    userUpdates: userUpdates,
                  });
                  if (errrrr) {
                    return res.status(400).json({
                      id: 20,
                      statusCode: 400,
                      message: errrrr,
                      password: process.env.CLIENT_PASSWORD,
                    });
                  } else {
                    return res.status(200).json({
                      id: 13,
                      statusCode: 200,
                      message: "Refercode generated succesfully...",
                      user: updatedUser,
                      password: process.env.CLIENT_PASSWORD,
                    });
                  }
                }
              }
            } else {
              return res.status(400).json({
                id: 20,
                statusCode: 400,
                message: "User authentication failed...",
                password: process.env.CLIENT_PASSWORD,
              });
            }
          } else {
            return res.status(400).json({
              id: 20,
              statusCode: 400,
              message: "Access denied...",
              password: process.env.CLIENT_PASSWORD,
            });
          }
        } catch (error) {
          console.log(
            "Some error occured in the auth-refers login route: ",
            error
          );
          return res.status(500).json({
            id: 20,
            statusCode: 500,
            message: "Internal server error...",
            password: process.env.CLIENT_PASSWORD,
          });
        }
      }
    }
  );

  module.exports = router;
} catch (error) {
  console.log("Some error occured in the auth-users main branch: ", error);
}
