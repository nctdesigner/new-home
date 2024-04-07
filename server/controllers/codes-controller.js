const codes = require("../db/models/codes-model")
const encrypter = require("../lib/encryption/encrypter")


const addCode = async ({ id, value, teamId, teamPassword }) => {
    try {
        let newCode = await codes.create({
            _referralCode: value,
            _teamId: teamId,
            _userId: id,
            _teamPassword: await encrypter(teamPassword),
        })

        if (newCode) {
            return {
                newCode
            }
        } else {
            return {
                codeErr: 'Referral registration thread failed...'
            }
        }
    } catch (codeErr) {
        return {
            codeErr: 'Referral registration thread denied...'
        }
    }
}

const getCode = async ({ id }) => {
    try {
        let code = await codes.findById(id).select("-_teamPassword")

        if (code) {
            return {
                code
            }
        } else {
            return {
                codeErr: 'Code fetching thread failed...'
            }
        }
    } catch (codeErr) {
        return {
            codeErr: 'Code fetching thread denied...'
        }
    }
}

const getCodes = async () => {
    try {
        let codeArray = await codes.find({})

        if (codeArray) {
            return {
                codeArray
            }
        } else {
            return {
                codeErr: 'Code fetching thread failed...'
            }
        }
    } catch (codeErr) {
        return {
            codeErr: 'Code fetching thread denied...'
        }
    }
}

const updateCode = async ({ id, codeUpdates }) => {
    try {
        let code = await codes.findByIdAndUpdate(id, codeUpdates);
        const updatedCode = await codes.findById(id)

        if (updatedCode) {
            return {
                updatedCode
            }
        } else {
            return {
                codeErrr: 'Code updation thread failed...'
            }
        }
    } catch (codeErr) {
        return {
            codeErrr: 'Code updation thread denied...'
        }
    }
}

const deleteCode = async ({ id }) => {
    try {
        let deletedCode = await codes.findByIdAndDelete(id);

        if (deletedCode) {
            return {
                deletedCode
            }
        } else {
            return {
                codeErr: 'Code deletion thread failed...'
            }
        }
    } catch (codeErr) {
        return {
            codeErr: 'Code deletion thread denied...'
        }
    }
}

module.exports = {
    addCode,
    getCode,
    updateCode,
    deleteCode,
    getCodes
}
