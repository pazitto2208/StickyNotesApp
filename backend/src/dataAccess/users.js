import mySqliteDb from "../database/database.js"

export default class UsersDataAccess {
    constructor() {
        this.db = mySqliteDb
    }

    async getUsers() {
        return new Promise((resolve, reject) => {
            this.db.all(`
            SELECT * 
            FROM users;
            `, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    async getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            this.db.all(`
            SELECT * 
            FROM users 
            WHERE username = ?;
            `,
            [ username ], 
            (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row[0])
                }
            })
        })
    }

    async addUser({id,username,password,salt}) {
        return new Promise((resolve, reject) => {
            this.db.run(`
            INSERT INTO users (id,username, password, salt) 
            VALUES (?,?,?,?)
            `, 
            [
                id.toString(),
                username, 
                password, 
                salt
            ],
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ 
                        id: id.toString(),
                        username
                    })
                }
            })
        })
    }
}