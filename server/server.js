try {
    const express = require('express');
    const cors = require('cors');
    const dotenv = require('dotenv');
    const helmet = require('helmet');
    const morgan = require('morgan');
    const http = require("http");
    const { Server } = require("socket.io")
    const authUsers = require('./db/routes/auth-users')
    const authRefers = require('./db/routes/auth-refers')
    const authProducts = require('./db/routes/auth-products')
    const authBanners = require('./db/routes/auth-banners')
    const connectToDatabase = require('./db/connect-to-database')
    const generateConnectionUrl = require("./src/connection-url-generator")
    const generateReferralCode = require("./src/generate-referral-code")
    const decrypter = require("./lib/decryption/decrypter")
    const verifyToken = require("./middlewares/verify-jwt-token")
    const { addUsers, deleteUsers, getUsers, updateUsers } = require('./controllers/users-controller')
    const { addCode, deleteCode, getCode, getCodes, updateCode } = require('./controllers/codes-controller')
    const { addOrder, deleteOrder, getOrder, getOrders, updateOrder } = require('./controllers/orders-controllers')

    // Server configuration

    dotenv.config()
    connectToDatabase();
    const app = express();
    const port = process.env.PORT || 1337;
    const connection_string = generateConnectionUrl(60)

    // Adding the middlewares

    app.use(express.json()); // Specifying the server to use the json function of the EXPRESS framework
    app.use(cors())  // Specifying the server to use the cors module
    app.use(helmet()); // Specifying the server to use the helmet module
    app.use(morgan("common")); // Specifying the server to use the morgan module
    app.use("/api/rAuth", authUsers)
    app.use("/api/r2Auth", authRefers)
    app.use("/api/pAuth", authProducts  )
    app.use("/api/bAuth", authBanners)

    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000"],
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });

    const getTodayDate = () => {
        const today = new Date();

        // Extract day, month, and year
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const year = today.getFullYear();
        
        // Format the date as DD-MM-YYYY
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate 
    }

    io.on("connection", async (socket) => {
        console.log("Member Connected:", socket.id)

        socket.on("get_user", async ({ authToken, password }, callback) => {
            try {
                if (password === process.env.SERVER_SOCKET_PASSWORD) {
                    const { id, err } = verifyToken({ authToken })
                    if (err) return callback(err);

                    const { user, error } = await getUsers({ id });
                    if (error) return callback(error);

                    if (user._ownTeamId !== "" && user._ownTeamRole === 'admin' && user._ownTeamPassword !== "") {
                        var { errr } = await getTeam({ teamId: user._teamId });
                        if (errr) return callback(errr);
                    }

                    socket.emit("got_user", { password: process.env.CLIENT_SOCKET_PASSWORD, user })
                    return callback()
                } else {
                    return callback('Access denied...')
                }
            } catch (err) {
                console.log('Error in get_user handler:', err)
                return callback('Internal server error...')
            }
        })

        socket.on("get_user_team", async ({ authToken, password, teamId }, callback) => {
            try {
                if (password === process.env.SERVER_SOCKET_PASSWORD) {
                    const { id, err } = verifyToken({ authToken })
                    if (err) return callback(err);

                    const { user, error } = await getUsers({ id });
                    if (error) return callback(error);

                    if (`"${id}"` !== JSON.stringify(user._id)) return callback('User authentication failed...')
                    if (user._ownTeamId !== teamId) return callback("Team authentication failed...")

                    var { team, errr } = await getTeam({ teamId });
                    if (errr) return callback(errr);

                    socket.join(team._id)

                    socket.emit("got_user_team", { password: process.env.CLIENT_SOCKET_PASSWORD, team })
                    return callback()
                } else {
                    return callback('Access denied...')
                }
            } catch (err) {
                console.log("Some error occurred in get_user_team handler:", err)
                return callback('Internal server error...')
            }
        })

        socket.on("generate_refer_code", async ({ authToken, teamName, teamPassword, password }, callback) => {
            try {
                if (password === process.env.SERVER_SOCKET_PASSWORD) {
                        const { id, err } = verifyToken({ authToken })
                        if (err) return callback(err);

                        const { user, error } = await getUsers({ id });
                        if (error) return callback(error);

                        if (`"${id}"` !== JSON.stringify(user._id)) return callback('User authentication failed...')
                        if (user._ownTeamRole === "admin" || user._ownTeamId !== "") return callback('You cannot create multiple teams..')
                        if (user._ownTeamRole === "neutral" && user._ownTeamId === "") {

                        const { newTeam, errr } = await addTeam({ teamName, teamPassword, id });
                        if (errr) return callback(errr);

                        if (newTeam._teamAdmin !== id && `"${newTeam._teamAdmin}"` !== JSON.stringify(user._id)) return callback('Registration thread denied...')

                        const referralCode = generateReferralCode()
                        const userUpdates = {
                            _ownTeamId: newTeam._id,
                            _ownTeamRole: 'admin',
                            _ownTeamPassword: teamPassword,
                            _referCode: referralCode
                        }
                        const { updatedUser, errrrr } = await updateUsers({ id, userUpdates })
                        if (errrrr) return callback(errrrr);

                        socket.leave(user._teamId)
                        socket.join(updatedUser._teamId)

                        const { newCode, codeErrr } = await addCode({ teamId: newTeam._id, teamPassword, id, value: referralCode });
                        if (codeErrr) return callback(codeErrr);

                        socket.emit("generated_refer_code", { password: process.env.CLIENT_SOCKET_PASSWORD, referralCode })
                        socket.emit("user_updated", { password: process.env.CLIENT_SOCKET_PASSWORD, updatedUser })
                        socket.emit("generated_team", { password: process.env.CLIENT_SOCKET_PASSWORD, newTeam })
                        return callback()
                    }
                } else {
                    return callback('Access denied...')
                }
            } catch (err) {
                console.log('Some error occurred in the register_user_team handler:', err)
                return callback('Internal server error...')
            }
        })

        socket.on("register_order", async ({ authToken, orderNo, orderAddress, orderTotalAmount }, callback) => {
            try {
                if (password === process.env.SERVER_SOCKET_PASSWORD) {
                        const { id, err } = verifyToken({ authToken })
                        if (err) return callback(err);

                        const { user, error } = await getUsers({ id });
                        if (error) return callback(error);

                        if (`"${id}"` !== JSON.stringify(user._id)) return callback('User authentication failed...')

                        const userCashback = ((10/100) * parseInt(orderTotalAmount));
                        const { newOrder, orderErr } = await addOrder({
                            id,
                            orderNo,
                            orderAddress,
                            orderNetAmount: orderTotalAmount,
                            orderCashback: userCashback,
                            orderDate: getTodayDate()
                        })
                        if(orderErr) return callback(orderErr)

                        if(user._teamId !== "" && user._teamPassword !== "" ) {

                            var { team, errr } = await getTeam({ 
                                teamId: user._teamId
                             });
                            if (errr) return callback(errr);

                            const teamAdmin = await getUsers({ 
                                id: team._teamAdmin
                             });
                            if (teamAdmin.error) return callback(teamAdmin.error);

                            const adminCashback = ((5/100) * parseInt(orderTotalAmount));
                            const userUpdates = {
                                _referCarrierCoinsTxn: referCarrierCoinsTxn.push({
                                    _value: adminCashback,
                                    _fromUserId: id,
                                    _date: newOrder._orderDate,
                                    _orderId: newOrder._id
                                })
                            }
                            const { updatedUser, errrrr } = await updateUsers({ 
                                id: teamAdmin._id,
                                userUpdates
                             })

                             io.to(updatedUser._teamId).emit("coins_received_from_member", { password: process.env.CLIENT_SOCKET_PASSWORD, chat: updatedChat, target: updatedTeamAdmin.updatedUser._id })
                             io.to(updatedUser._teamId).emit("user_updated", { password: process.env.CLIENT_SOCKET_PASSWORD, updatedUser, target: teamAdmin.user._id })
                        }
                        const ordersArray = [];
                        const userUpdates = {
                            _orders: ordersArray.push({
                                _orderId: newOrder._id,
                                _orderNo: orderNo,
                                _orderNetAmount: orderTotalAmount,
                                _orderCashback: userCashback,
                                _orderDate: newOrder._orderDate
                            })
                        }
                        const { updatedUser, errrrr } = await updateUsers({ 
                            id: teamAdmin._id,
                            userUpdates
                        })
                        if(errrrr) return callback(errrrr)

                        socket.emit("user_updated", { password: process.env.CLIENT_SOCKET_PASSWORD, updatedUser })
                        socket.emit("order_registered", { password: process.env.CLIENT_SOCKET_PASSWORD, newOrder })

                        return callback()
                } else {
                    return callback('Access denied...')
                }
            } catch (err) {
                console.log('Some error occurred in the register_user_team handler:', err)
                return callback('Internal server error...')
            }
        })

        socket.on('disconnect', async () => {
            try {
                if (!globalFromInstance) {
                    if (userAuthToken !== "") {
                        const { id, err } = verifyToken({ authToken: userAuthToken })
                        if (!err) {
                            const { user, error } = await getUsers({ id });

                            const checkActiveSession = (browser) => {
                                return browser.sessionId === user._wpSessionData
                            }

                            const getActiveSession = (browser) => {
                                if (browser.sessionId === user._wpSessionData) {
                                    return browser
                                }
                            }
                            if (!error) {
                                if (browser_wp_sessions.find(checkActiveSession)) {
                                    console.log("Closing the previous active session")

                                    const page = browser_wp_sessions.find(getActiveSession)
                                    await page.page.close()

                                    for (let index = 0; index < browser_wp_sessions.length; index++) {
                                        const element = browser_wp_sessions[index];
                                        if (element.sessionId === user._wpSessionData) {
                                            browser_wp_sessions.splice(index, 1)
                                            break;
                                        }
                                    }

                                    if (user._teamRole === 'neutral') {
                                        if (user._wpIntegration && user._wpSessionData !== "") {
                                            if (!browser_wp_sessions.find(checkActiveSession)) {
                                                console.log("Launching browser after adding the array")
                                                const browser = await puppeteer.launch({
                                                    headless: true
                                                });
                                                const page = await browser.newPage();
                                                await page.goto(`http://localhost:1337/home?authToken=${userAuthToken}`);


                                                const userUpdates = {
                                                    _wpInstanceActive: true
                                                }
                                                const { errrrr } = await updateUsers({ id, userUpdates })
                                                if (!errrrr) {
                                                    browser_wp_sessions.push({
                                                        sessionId: user._wpSessionData,
                                                        page
                                                    })
                                                }
                                            } else {
                                                var page2 = browser_wp_sessions.find(getActiveSession)
                                                await page2.page.close()

                                                for (let index = 0; index < browser_wp_sessions.length; index++) {
                                                    const element = browser_wp_sessions[index];
                                                    if (element.sessionId === user._wpSessionData) {
                                                        browser_wp_sessions.splice(index, 1)
                                                        break;
                                                    }
                                                }

                                                console.log("Launching browser after removing the array")

                                                const browser = await puppeteer.launch({
                                                    headless: true
                                                });
                                                const page = await browser.newPage();
                                                await page.goto(`http://localhost:1337/home?authToken=${userAuthToken}`);

                                                const userUpdates = {
                                                    _wpInstanceActive: true
                                                }
                                                const { errrrr } = await updateUsers({ id, userUpdates })
                                                if (!errrrr) {
                                                    browser_wp_sessions.push({
                                                        sessionId: user._wpSessionData,
                                                        page
                                                    })
                                                }

                                            }
                                        }
                                    } else if (user._teamRole === 'admin') {
                                        var { team, errr } = await getTeam({ teamId: user._teamId });
                                        if (!errr) {
                                            if (user._wpIntegration && user._wpSessionData !== "" && team._teamWpIntegration && team._teamWpSessionData !== "") {
                                                if (!browser_wp_sessions.find(checkActiveSession)) {
                                                    console.log("Launching browser after adding the array")
                                                    const browser = await puppeteer.launch({
                                                        headless: true
                                                    });
                                                    const page = await browser.newPage();
                                                    await page.goto(`http://localhost:1337/home?authToken=${userAuthToken}`);


                                                    const userUpdates = {
                                                        _wpInstanceActive: true
                                                    }
                                                    const { errrrr } = await updateUsers({ id, userUpdates })

                                                    const teamUpdates = {
                                                        _teamWpInstanceActive: true
                                                    }
                                                    const { errrr } = await updateTeam({ teamId: user._teamId, teamUpdates })

                                                    if (!errrrr && !errrr) {
                                                        browser_wp_sessions.push({
                                                            sessionId: user._wpSessionData,
                                                            page
                                                        })
                                                    }
                                                } else {
                                                    var page2 = browser_wp_sessions.find(getActiveSession)
                                                    await page2.page.close()

                                                    for (let index = 0; index < browser_wp_sessions.length; index++) {
                                                        const element = browser_wp_sessions[index];
                                                        if (element.sessionId === user._wpSessionData) {
                                                            browser_wp_sessions.splice(index, 1)
                                                            break;
                                                        }
                                                    }

                                                    console.log("Launching browser after removing the array")

                                                    const browser = await puppeteer.launch({
                                                        headless: true
                                                    });
                                                    const page = await browser.newPage();
                                                    await page.goto(`http://localhost:1337/home?authToken=${userAuthToken}`);

                                                    const userUpdates = {
                                                        _wpInstanceActive: true
                                                    }
                                                    const { errrrr } = await updateUsers({ id, userUpdates })

                                                    const teamUpdates = {
                                                        _teamWpInstanceActive: true
                                                    }
                                                    const { errrr } = await updateTeam({ teamId: user._teamId, teamUpdates })

                                                    if (!errrrr && !errrr) {
                                                        browser_wp_sessions.push({
                                                            sessionId: user._wpSessionData,
                                                            page
                                                        })
                                                    }

                                                }
                                            }
                                        }
                                    } else if (user._teamRole === 'seller') {
                                        var { team, errr } = await getTeam({ teamId: user._teamId });

                                        if (!errr) {
                                            if (user._wpIntegration && user._wpSessionData !== "" && team._teamWpIntegration && team._teamWpSessionData !== "") {
                                                if (!browser_wp_sessions.find(checkActiveSession)) {
                                                    console.log("Launching browser after adding the array")

                                                    const page = await browser.newPage();
                                                    await page.goto(`http://localhost:1337/home?authToken=${team._teamAdminAuthToken}`);


                                                    const userUpdates = {
                                                        _wpInstanceActive: true
                                                    }
                                                    const { errrrr } = await updateUsers({ id: team._teamAdmin, userUpdates })

                                                    const teamUpdates = {
                                                        _teamWpInstanceActive: true
                                                    }
                                                    const { errrr } = await updateTeam({ teamId: user._teamId, teamUpdates })

                                                    if (!errrrr && !errrr) {
                                                        browser_wp_sessions.push({
                                                            sessionId: user._wpSessionData,
                                                            page
                                                        })
                                                    }
                                                } else {
                                                    var page2 = browser_wp_sessions.find(getActiveSession)
                                                    await page2.page.close()

                                                    for (let index = 0; index < browser_wp_sessions.length; index++) {
                                                        const element = browser_wp_sessions[index];
                                                        if (element.sessionId === user._wpSessionData) {
                                                            browser_wp_sessions.splice(index, 1)
                                                            break;
                                                        }
                                                    }

                                                    console.log("Launching browser after removing the array")

                                                    const page = await browser.newPage();
                                                    await page.goto(`http://localhost:1337/home?authToken=${team._teamAdminAuthToken}`);

                                                    const userUpdates = {
                                                        _wpInstanceActive: true
                                                    }
                                                    const { errrrr } = await updateUsers({ id: team._teamAdmin, userUpdates })

                                                    const teamUpdates = {
                                                        _teamWpInstanceActive: true
                                                    }
                                                    const { errrr } = await updateTeam({ teamId: user._teamId, teamUpdates })

                                                    if (!errrrr && !errrr) {
                                                        browser_wp_sessions.push({
                                                            sessionId: user._wpSessionData,
                                                            page
                                                        })
                                                    }

                                                }
                                            }
                                        }
                                    }
                                } else {
                                    console.log('Launching the whatsapp instance')
                                    if (user._wpIntegration && user._wpSessionData !== "") {
                                        if (!browser_wp_sessions.find(checkActiveSession)) {
                                            console.log("Launching the whatsapp instance after registering in the ledger")

                                            const browser = await puppeteer.launch({
                                                headless: true
                                            });
                                            const page = await browser.newPage();
                                            await page.goto(`http://localhost:1337/home?authToken=${userAuthToken}`);


                                            const userUpdates = {
                                                _wpInstanceActive: true
                                            }
                                            const { errrrr } = await updateUsers({ id, userUpdates })
                                            if (!errrrr) {
                                                browser_wp_sessions.push({
                                                    sessionId: user._wpSessionData,
                                                    page
                                                })
                                            }
                                        } else {
                                            console.log("Launching the whatsapp instance after destroying the last instance")

                                            for (let index = 0; index < browser_wp_sessions.length; index++) {
                                                const element = browser_wp_sessions[index];
                                                if (element.sessionId === user._wpSessionData) {
                                                    browser_wp_sessions.splice(index, 1)
                                                    break;
                                                }
                                            }

                                            const browser = await puppeteer.launch({
                                                headless: true
                                            });
                                            const page = await browser.newPage();
                                            await page.goto(`http://localhost:1337/home?authToken=${userAuthToken}`);


                                            const userUpdates = {
                                                _wpInstanceActive: true
                                            }
                                            const { errrrr } = await updateUsers({ id, userUpdates })
                                            if (!errrrr) {
                                                browser_wp_sessions.push({
                                                    sessionId: user._wpSessionData,
                                                    page
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (err) {
            }
        })
    })

    server.listen(port, () => {
        console.log("X--- NCTTech socket server succesfully running ---X");
        console.log(`X--- NCTTech socket server connection key: ${connection_string} ---X`);
        console.log(`X--- NCTTech socket server connection port: ${port} ---X`);
    });

} catch (error) {
    console.log("Some error occured in server main branch: ", error)
}