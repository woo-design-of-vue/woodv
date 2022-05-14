export const strToNum =(value)=>{
    if(typeof value === "string"){
        return Number(value.replace(/[^\d]/g, ""));
    }
    return value;
};

export const strToLength =(value)=>{
    if(typeof value === "string"){
        return Number(value.replace(/[^\d]/g, ""));
    }
    if(typeof value === "number"){
        return value;
    }
    return value;
};