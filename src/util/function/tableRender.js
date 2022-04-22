export default (text, item, index, child, slots)=>{
    if(child.slots && slots[child.slots]){
        return [
            slots[child.slots]({
                text:text,
                row:item,
                index:index,
                config:child
            })
        ];
    }
    if(child.render){
        return [child.render(text, item, index, child)];
    }else{
        return [text];
    }
};