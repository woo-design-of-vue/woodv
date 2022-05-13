export const strToNum =(value)=>{
    if(typeof value === "string"){
        return Number(value.replace(/[^\d]/g, ""));
    }
    return value;
};