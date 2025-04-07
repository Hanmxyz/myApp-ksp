import bcrypt from "bcrypt"

const salt_round = 10

export async function hashPassword(password) {
    try {
        const hashed = await bcrypt.hash(password, salt_round)
        return hashed
    } catch (error) {
        throw new Error('hashing failed : ', error.message )
    }
}


export async function verifyPassword(password, hashPassword) {
    try {
        const match = await bcrypt.compare(password, hashPassword)
        return match
    } catch (error) {
        throw new Error('verification is failed : ', error.message)
    }
}
