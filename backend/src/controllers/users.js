import { ok, serverError } from "../helpers/httpResponses.js"
import UsersDataAccess from "../dataAccess/users.js"
import { v4 as uuidv4 } from 'uuid'

export default class UsersControllers {
    constructor() {
        this.dataAccess = new UsersDataAccess()
    }

    async getUsers() {
        try {
            const users = await this.dataAccess.getUsers()

            return ok({ users, message: 'Users retrieved correctly' })
        } catch (error) {
            return serverError({ error, message: 'Failed to retrieve users' })
        }
    }

    async addUser({username,password,salt}) {
        try {
            const id = uuidv4()
            const user = await this.dataAccess.addUser({id,username,password,salt})

            return ok({ user, message: 'User inserted correctly' })
        } catch (error) {
            return serverError({ error, message: 'Failed to insert user' })
        }
    }

    async getUserByUsername(username) {
        try {
            const user = await this.dataAccess.getUserByUsername(username)

            return ok({ user, message: 'User retrieved correctly' })
        } catch (error) {
            return serverError({ error, message: 'Failed to retrieve user' })
        }
    }
}