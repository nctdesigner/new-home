const fbRequests = require("../db/models/facebook-requests-model")
const encrypter = require("../lib/encryption/encrypter")

const addFbRequest = async ({ adminName, teamName, teamId, adminId }) => {
    try {
        const newFbRequest = await fbRequests.create({
            _teamName: teamName,
            _teamLeader: adminName,
            _teamId: teamId,
            _teamLeaderId: adminId
        })

        if (newFbRequest) {
            return {
                newFbRequest
            }
        } else {
            return {
                fbReqCreatingErr: "Facebook Request adding thread failed..."
            }
        }
    } catch (err) {
        return {
            fbReqCreatingErr: "Facebook Request adding thread denied..."
        }
    }
}

const getAllFbRequests = async () => {
    try {
        const allFbRequests = await fbRequests.find({})
        if (!allFbRequests) {
            return {
                allFbReqError: 'Facebook request fetching thread failed...'
            }
        } else {
            return {
                allFbRequests
            }
        }
    } catch (err) {
        return {
            allFbReqError: 'Facebook request fetching thread denied...'
        }
    }
}

// const updateAdmin = async ({ id, adminUpdates }) => {
//     try {
//         const admin = await admins.findByIdAndUpdate(id, userUpdates)
//         const updatedAdmin = await admins.findById(id)

//         if (!updatedAdmin) {
//             return {
//                 errrrr: 'Admin upadation thread failed...'
//             }
//         } else {
//             return {
//                 updatedAdmin
//             }
//         }
//     } catch (err) {
//         return {
//             errrrr: 'Admin updation thread denied...'
//         }
//     }
// }

const deleteFbRequest = async ({ facebookId }) => {
    try {
        const deletedFacebookRequest = await fbRequests.findByIdAndDelete(facebookId);

        if (!deletedFacebookRequest) {
            return {
                deletedFbError: 'Facebook request deletion thread failed...'
            }
        } else {
            return {
                deletedFacebookRequest
            }
        }
    } catch (err) {
        console.log(err)
        return {
            deletedFbError: 'Facebook request deletion thread denied...'
        }
    }
}

module.exports = {
    addFbRequest,
    getAllFbRequests,
    deleteFbRequest
}