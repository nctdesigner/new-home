const admins = require("../db/models/admin-model")
const encrypter = require("../lib/encryption/encrypter")

const addAdmin = async ({ adminName, adminEmail, adminPassword}) => {
    try {
        const newAdmin = await admins.create({
            _name: `${adminName} `,
            _email: adminEmail,
            _password: await encrypter(adminPassword),
        })

        if (newAdmin) {
            return {
                newAdmin
            }
        } else {
            return {
                errrror: "Admin adding thread failed..."
            }
        }
    } catch (err) {
        return {
            errrror: "Admin adding thread denied..."
        }
    }
}

const getAdmin = async ({ id }) => {
    try {
        const admin = await admins.findById(id).select("-_password");
        if (!admin) {
            return {
                error: 'User fetching thread failed...'
            }
        } else {
            return {
                admin
            }
        }
    } catch (err) {
        return {
            error: 'Admin fetching thread denied...'
        }
    }
}

const updateAdmin = async ({ id, adminUpdates }) => {
    try {
        const admin = await admins.findByIdAndUpdate(id, userUpdates)
        const updatedAdmin = await admins.findById(id)

        if (!updatedAdmin) {
            return {
                errrrr: 'Admin upadation thread failed...'
            }
        } else {
            return {
                updatedAdmin
            }
        }
    } catch (err) {
        return {
            errrrr: 'Admin updation thread denied...'
        }
    }
}

const deleteAdmin = async ({ id }) => {
    try {
        const deletedAdmin = await admins.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return {
                error: 'Admin deletion thread failed...'
            }
        } else {
            return {
                deletedAdmin
            }
        }
    } catch (err) {
        return {
            error: 'Admin deletion thread failed...'
        }
    }
}

module.exports = {
    addAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
}