import bcrypt from 'bcrypt'
import User from '../models/user.model';


export const checkEmail = async (body, data) => {
    const { FirstName, LastName, Email, Password } = body
    if (data === null) {
        if (body.Password === body.ConfirmPassword) {
            const hashedPassword = await bcrypt.hash(Password, 10)
            const data = await User.create({
                FirstName,
                LastName,
                Email,
                Password: hashedPassword
            })
            return data;
        } else {
            throw new Error("Password did not match")
        }
    } else {
        throw new Error("Email already registered")
    }
}
