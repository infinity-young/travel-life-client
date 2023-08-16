import { HomePageTypes } from "../../config/actionConfig.ts";



export function initHomePage(){
   return {
    type:HomePageTypes.INIT_HOME_PAGE
   }
}

export function getHomePageData(){
    return {
        type:HomePageTypes.GET_HOME_PAGE_REQUEST
    }
}

export function setHomePageData(payload){
    return {
        type:HomePageTypes.SET_HOME_PAGE_REQUEST_DATA,
        payload
    }
}