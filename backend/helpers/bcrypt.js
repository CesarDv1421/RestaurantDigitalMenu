import bcrypt from "bcrypt";

const encrypt = {};

encrypt.encryptPassword = async (password) => {
  try {

    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  
  } catch (err) {
    console.log(err)
  }
};

encrypt.matchPassword = async (password, encryptedPassword) => {
  try {

    return await bcrypt.compare(password, encryptedPassword);
  
  } catch (err) {
    console.log(err)
  }
};

export default encrypt;
