import bcrypt, { genSaltSync } from "bcrypt"

export const hashPassword = async (password) => {
    try {
        const salt = genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);

}