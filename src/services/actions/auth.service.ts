import { authKey } from "@/contants/authkey"
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "../../utils/local-storage"
import { decodedToken } from "@/utils/jwt"

export const storeUserInfo =({accessToken}:{accessToken:string})=>{
     return   setToLocalStorage(authKey, accessToken)
}

export const getUserInfo =()=>{
     const authToken=   getFromLocalStorage(authKey)
     if (authToken) {
          const decodedData:any = decodedToken(authToken)
          
          return {
               ...decodedData,
               role:decodedData?.role?.toLowerCase(),
              
          }
          
     }
}

export const isLoggedin =()=>{
     const authToken = getFromLocalStorage(authKey)
     if (authToken) {
          return !!authToken
     }
}
export const removeUser = () => {
     return removeFromLocalStorage(authKey);
  };