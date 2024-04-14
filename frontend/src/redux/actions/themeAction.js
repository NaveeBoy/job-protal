import { THEME_MODE } from "../constants/themeModeConstant"

export const togglActionTheme =() =>(dispatch)=>{
    dispatch ({type:THEME_MODE})
}