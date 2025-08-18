import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

const db = drizzle('file:database.sqlite')
