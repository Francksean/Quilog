import { UserModel } from '../models/Users.js';

export const updateUserInfos = async(req, res) => {
  const { userId, updatedValue, field } = req.body;
  console.log(`id : ${userId} | updatedValue : ${updatedValue} | field : ${field}`)
  const fieldUpdater = await UserModel.updateOne(
    { "_id":userId },
    {
      $set : { [field]: updatedValue}
    }
  )
  if(fieldUpdater){
    res.send({ message:"datas updated correctly" })
  }
}

export const getUserBrief = async(req, res) => {
  const { userId } = req.params;
  const userBrief = await UserModel.findOne(
    { "_id":userId },
    { profilePic: 1, username: 1}
  );
  if(userBrief){
    res.send({ profilePic : userBrief.profilePic, username: userBrief.username })
  }
}

export const getUserById =  async(req, res) => {
  const { userId } = req.params;
  const user = await UserModel.findOne({ "_id":userId });
  if(user){
    res.send({ user })
  }
}

