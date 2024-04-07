try {
    const router = require("express").Router();
    const products = require("../../db/models/banner-model");
    const { body, header, validationResult } = require("express-validator");
    const jwt = require("jsonwebtoken");
    const verifyUser = require("../middlewares/verify-jwt-token");
    const dotenv = require("dotenv");
  
    dotenv.config();
    const jwt__Key = process.env.NCT_JWT_KEY;
  
    router.post(
      "/create",
      [
        body("title", "Please provide valid title...").isLength({ min: 3 }),
        body("subtitle", "Please provide valid subtitle...").isLength({ min: 3 }),
        body("image", "Please provide valid image...").isLength({ min: 2 }),
        body("redirectText", "Please provide valid redirect text...").isLength({ min: 2 }),
        body("redirectUrl", "Please provide valid redirect url...").isLength({ min: 1 }),
        body("name", "Please provide valid banner name...").isLength({ min: 1 }),
    ],
      async (req, res) => {
        console.log(req.body)
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          console.log(errors.array());
          return res.status(411).json({
            id: 2,
            statusCode: 411,
            message: "Please provide valid product details...",
            errors: errors.array(),
            password: process.env.CLIENT_PASSWORD,
          });
        } else if (errors.isEmpty()) {
          try {
            if (req.header("serverPass") === process.env.SERVER_PASSWORD) {
              const { title, subtitle, image, redirectText, redirectUrl, name } = req.body

              let registeredBanner = await products.findOne({
                _name: name.trim(),
              });
  
              if (registeredBanner) {
                return res.status(409).json({
                  id: 16,
                  statusCode: 409,
                  message: "Banner already registered...",
                  password: process.env.CLIENT_PASSWORD,
                });
              } else {
                  await products.create({
                    _title: `${title.trim()}`,
                    _subtitle: `${subtitle.trim()}`,
                    _name: `${name.trim()}`,
                    _redirectText: `${redirectText.trim()}`,
                    _redirectUrl: `${redirectUrl.trim()}`,
                    _image: image
                  });
  
                  return res.status(201).json({
                    id: 13,
                    statusCode: 201,
                    message: "Banner registered succesfully...",
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
              "Some error occured in the auth-banners create route: ",
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
  
    router.get("/get", async (req, res) => {
        try {
          if (req.header("serverPass") === process.env.SERVER_PASSWORD) {
            console.log(req.header('slug'))
            const productData = await products
              .findById(req.header('slug').trim())
              if (!productData) {
                  return res.status(400).json({
                      id: 18,
                      statusCode: 400,
                      message: "No such banner data...",
                    });
                } else {
        if(productData._published){
            return res.status(200).json({
                id: 12,
                statusCode: 200,
                message: "Banner data fetched successfully...",
                password: process.env.CLIENT_PASSWORD,
                data: productData,
            });
        } else {
            return res.status(400).json({
                id: 18,
                statusCode: 400,
                message: "No such banner data...",
              });
        }
            }
          } else {
            return res.status(400).json({
              id: 20,
              statusCode: 403,
              message: "Access denied...",
            });
          }
        } catch (error) {
          console.log("Some error occured in the auth-products create route: ");
          return res.status(500).json({
            id: 20,
            statusCode: 500,
            message: "Internal server error...",
          });
        }
      });

    router.get("/delete", async (req, res) => {
      try {
        if (req.header("serverPass") === process.env.SERVER_PASSWORD) {
          const productData = await products
            .findByIdAndDelete(req.header('id').trim())
          if (!productData) {
            return res.status(400).json({
              id: 18,
              statusCode: 400,
              message: "No such banner data...",
            });
          } else {
            return res.status(200).json({
              id: 12,
              statusCode: 200,
              message: "Banner deleted successfully...",
              password: process.env.CLIENT_PASSWORD,
              data: productData,
            });
          }
        } else {
          return res.status(400).json({
            id: 20,
            statusCode: 403,
            message: "Access denied...",
          });
        }
      } catch (error) {
        console.log("Some error occured in the auth-products create route: ", error);
        return res.status(500).json({
          id: 20,
          statusCode: 500,
          message: "Internal server error...",
        });
      }
    });

    router.get("/fetch", async (req, res) => {
      try {
        if (req.header("serverPass") === process.env.SERVER_PASSWORD) {
          const productsData = await products.find()
          if (!productsData) {
            return res.status(400).json({
              id: 18,
              statusCode: 400,
              message: "No banners in the database...",
            });
          } else {
            return res.status(200).json({
              id: 12,
              statusCode: 200,
              message: "Banners data fetched successfully...",
              password: process.env.CLIENT_PASSWORD,
              data: productsData,
            });
          }
        } else {
          return res.status(400).json({
            id: 20,
            statusCode: 403,
            message: "Access denied...",
          });
        }
      } catch (error) {
        console.log("Some error occured in the auth-banner fetch route: ", error);
        return res.status(500).json({
          id: 20,
          statusCode: 500,
          message: "Internal server error...",
        });
      }
    });

    router.post("/update", [
        header("id", "Please provide valid id...").isLength({ min: 3 }),
    ], async (req, res) => {
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(411).json({
              id: 2,
              statusCode: 411,
              message: "Please provide valid product details...",
              errors: errors.array(),
              password: process.env.CLIENT_PASSWORD,
            });
          } else if (errors.isEmpty()) {
      try {
        if (req.header("serverPass") === process.env.SERVER_PASSWORD) {
            const id = req.header('id')
            var prUpdates;
            const { updates, productUpdates } = req.body
            if(updates) {
              prUpdates = updates
            } else if (productUpdates) {
              prUpdates = productUpdates
            }
            await products.findByIdAndUpdate(id, prUpdates)
            const updatedProduct = await products.findById(id)
          if (!updatedProduct) {
            return res.status(400).json({
              id: 18,
              statusCode: 400,
              message: "Banner not updated...",
            });
          } else {
            return res.status(200).json({
              id: 12,
              statusCode: 200,
              message: "Banner updated successfully...",
              password: process.env.CLIENT_PASSWORD,
              data: updatedProduct,
            });
          }
        } else {
          return res.status(400).json({
            id: 20,
            statusCode: 403,
            message: "Access denied...",
          });
        }
      } catch (error) {
        console.log("Some error occured in the auth-products fetch route: ", error);
        return res.status(500).json({
          id: 20,
          statusCode: 500,
          message: "Internal server error...",
        });
      }
    }
    });

    router.get("/featured", async (req, res) => {
      try {
        if (req.header("serverPass") === process.env.SERVER_PASSWORD) {
          const productData = await products
            .find({
              _featured: true,
              _published: true
            })
            console.log({productData})
          if (!productData) {
            return res.status(400).json({
              id: 18,
              statusCode: 400,
              message: "No such product data...",
            });
          } else {
            return res.status(200).json({
              id: 12,
              statusCode: 200,
              message: "Products data fetched successfully...",
              password: process.env.CLIENT_PASSWORD,
              data: productData,
            });
          }
        } else {
          return res.status(400).json({
            id: 20,
            statusCode: 403,
            message: "Access denied...",
          });
        }
      } catch (error) {
        console.log("Some error occured in the auth-products create route: ", error);
        return res.status(500).json({
          id: 20,
          statusCode: 500,
          message: "Internal server error...",
        });
      }
    });

    router.get("/latest", async (req, res) => {
      try {
        if (req.header("serverPass") === process.env.SERVER_PASSWORD) {
          const productData = await products
            .find({
              _latest: true,
              _published: true
            })
          if (!productData) {
            return res.status(400).json({
              id: 18,
              statusCode: 400,
              message: "No such product data...",
            });
          } else {
            return res.status(200).json({
              id: 12,
              statusCode: 200,
              message: "Products data fetched successfully...",
              password: process.env.CLIENT_PASSWORD,
              data: productData,
            });
          }
        } else {
          return res.status(400).json({
            id: 20,
            statusCode: 403,
            message: "Access denied...",
          });
        }
      } catch (error) {
        console.log("Some error occured in the auth-products create route: ", error);
        return res.status(500).json({
          id: 20,
          statusCode: 500,
          message: "Internal server error...",
        });
      }
    });
  
    module.exports = router;
  } catch (error) {
    console.log("Some error occured in the auth-products main branch: ", error);
  }
  