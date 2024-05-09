import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const dbFilePath = path.join(dirname, 'mySqlite.db')

const mySqliteDb = new sqlite3.Database(dbFilePath)

export default mySqliteDb