import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

/**
 * Hashea una contraseña en texto plano usando bcryptjs.
 */
export async function hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS)
}

/**
 * Compara una contraseña en texto plano con un hash almacenado.
 */
export async function comparePassword(
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
}
