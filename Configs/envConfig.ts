import dotenv from 'dotenv';
dotenv.config()

const configs = {
    port: process.env.PORT || 5000,
    dburl: process.env.DATABASE_URL
}

export default configs