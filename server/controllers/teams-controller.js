const teams = require("../db/models/team-model")
const encrypter = require("../lib/encryption/encrypter")


const addTeam = async ({ teamName, teamPassword, id }) => {
    try {
        let newTeam = await teams.create({
            _teamName: teamName,
            _teamAdmin: id,
            _teamPassword: await encrypter(teamPassword),
        })

        if (newTeam) {
            return {
                newTeam
            }
        } else {
            return {
                teamErrr: 'Team registration thread failed...'
            }
        }
    } catch (errr) {
        console.log({errr})
        return {
            teamErrr: 'Team registration thread denied...'
        }
    }
}

const getTeam = async ({ teamId }) => {
    try {
        let team = await teams.findById(teamId).select("-_teamPassword")

        if (team) {
            return {
                team
            }
        } else {
            return {
                teamErrr: 'Team fetching thread failed...'
            }
        }
    } catch (errr) {
        return {
            teamErrr: 'Team fetching thread denied...'
        }
    }
}

const getAllTeam = async () => {
    try {
        let teamArray = await teams.find({})

        if (teamArray) {
            return {
                teamArray
            }
        } else {
            return {
                teamErrr: 'Team fetching thread failed...'
            }
        }
    } catch (errr) {
        return {
            teamErrr: 'Team fetching thread denied...'
        }
    }
}

const getTeamPassword = async ({ teamId }) => {
    try {
        let team = await teams.findById(teamId)

        if (team) {
            return {
                team
            }
        } else {
            return {
                teamErrr: 'Team fetching thread failed...'
            }
        }
    } catch (errr) {
        return {
            teamErrr: 'Team fetching thread denied...'
        }
    }
}

const updateTeam = async ({ teamId, teamUpdates }) => {
    try {
        let team = await teams.findByIdAndUpdate(teamId, teamUpdates);
        const updatedTeam = await teams.findById(teamId)

        if (updatedTeam) {
            return {
                updatedTeam
            }
        } else {
            return {
                errrr: 'Team updation thread failed...'
            }
        }
    } catch (errr) {
        console.log({errr})
        return {
            errrr: 'Team updation thread denied...'
        }
    }
}

const deleteTeam = async ({ teamId }) => {
    try {
        let deletedTeam = await teams.findByIdAndDelete(teamId);

        if (deletedTeam) {
            return {
                deletedTeam
            }
        } else {
            return {
                teamErrr: 'Team deletion thread failed...'
            }
        }
    } catch (errr) {
        return {
            teamErrr: 'Team deletion thread denied...'
        }
    }
}

module.exports = {
    addTeam,
    getTeam,
    getTeamPassword,
    updateTeam,
    deleteTeam,
    getAllTeam
}
