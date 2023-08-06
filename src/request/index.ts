import axios from 'axios';
import { BATH_PATH } from '../config/requestConfig.ts';
export function Request(path:string){
    const fullPath=BATH_PATH+path;
    return new Promise((resolve,reject)=>{
        axios.get(fullPath)
        .then((response)=>{resolve(response)})
        .catch((error)=>{reject(error)})
    })
}