import { authKey } from "@/contants/authkey"
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "../../utils/local-storage"
import { decodedToken } from "@/utils/jwt"
import { instance } from "@/healpers/axios/axiosInstance"

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

export const isLoggedIn = () => {
     const authToken = getFromLocalStorage(authKey);
     if (authToken) {
        return !!authToken;
     }
  };
export const removeUser = () => {
     return removeFromLocalStorage(authKey);
  };

export const getNewAccessToken = async()=>{
     return await instance({
          url:'http://localhost:5001/api/v1/auth/refresh-token',
          method:'POST',
          headers:{"Content-Type":"application/json"},
          withCredentials:true
     })
}