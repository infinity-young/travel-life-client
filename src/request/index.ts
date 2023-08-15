import axios from 'axios';
import { BATH_PATH } from '../config/requestConfig.ts';
export function Request(path:string,params?){
    const fullPath=BATH_PATH+path;
    return new Promise((resolve,reject)=>{
        axios.get(fullPath,{
            params: {
              ...params,
            }
          })
        .then((response)=>{resolve(response)})
        .catch((error)=>{reject(error)})
    })
}