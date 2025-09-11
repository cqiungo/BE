import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (password: string)=> {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing password:', error);
        throw new Error('Failed to compare password');
    }
}