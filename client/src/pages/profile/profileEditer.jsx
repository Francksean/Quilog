import React, { useRef, useState } from 'react'
import './profileEditer.css'
import logo from '../../assets/LOGO1.png'
import axios from 'axios'


import { useUser } from '../../components/context/userDatasContext'
import Header from '../../components/header/header'


function ProfileEditer() {
  const { user } = useUser()
  return (
    <div className='profile_editer'>
      <Header/>
      <div className="profile_editer_body">
        <div className="profile_editer_fields_container">
          <ProfileEditerField fieldName={"username"} fieldDefaultValue={user.username}/>
          <ProfileEditerField fieldName={"description"} fieldDefaultValue={user.userDescription}/>
          <ProfileEditerField fieldName={"email"} fieldDefaultValue={user.email}/>
          <div className="button_box">
            <button>Validate</button>
          </div>
        </div>
        <img src={ logo } alt="" />
      </div>
    </div>
  )
}

export default ProfileEditer


function ProfileEditerField({ fieldName, fieldDefaultValue}) {
  const { user } = useUser()

  const fieldRef = useRef(null)
  const [ fieldValue, setFieldValue ] = useState(fieldDefaultValue)

  const handleChange = (e) => {
    setFieldValue(e.target.value)
  }

  const fieldReseter = () => {
    setFieldValue(fieldDefaultValue)
    console.log('reset ok')
  }

  const changeSubmitter = async () => {
    let fieldGettingChanges = "";
    switch (fieldName){
      case 'username':
        fieldGettingChanges = "username"
        break;
      case 'description':
        fieldGettingChanges = "userDescription"
        break;
      case 'email':
        fieldGettingChanges = "email"
        break;
      case 'password':
        fieldGettingChanges = "password"
        break;
    }

    if(fieldValue != fieldDefaultValue ){
      const res = await axios.post("http://localhost:3000/infos/users/update/fields", { userId: user._id, updatedValue:fieldValue, field:fieldGettingChanges})
      if(res.data.message == "datas updated correctly" ){
        alert(res.data.message)
      }else{
        alert("error while updating datas")
      }
    }else{
      alert(`aucune différence entre l'ancien ${fieldName} et le nouveau.`)
    }
  }

  return (
    <div className="profile_editer_field">
      <label htmlFor={ fieldName }>{`change your ${fieldName} :`}</label>
        { fieldName == "description" ? 
          <textarea value={ fieldValue } id={ fieldName } ref={ fieldRef } onChange={(e)=> handleChange(e)} /> : 
          <input type="text" value={ fieldValue } id={ fieldName } ref={ fieldRef } onChange={(e)=> handleChange(e)}/> 
        }      
      <div className="editer_field_buttons">
        <button onClick={() => fieldReseter()} >Reset</button>
        <button onClick={() => changeSubmitter()} >Change</button>
      </div>
    </div>
  )
}
