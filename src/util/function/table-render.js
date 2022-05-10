import "material-design-icons-iconfont";



function setTableChildIsShow(e, isShow, row) {
    const targetList = document.getElementsByClassName("woo-table-target-"+row.wooTableIndex);

    if(isShow){
        e.innerText = "remove";
        for(const targetNode of targetList){
            targetNode.style.display = "table-row";
        }
    }else{
        e.innerText = "add";
        for(const targetNode of targetList){
            targetNode.style.display = "none";
        }
        if(row.children && row.children.length){
            for(const targetChild of row.children){
                const targetChildNode = document.getElementById("woo-table-child-material-icons-"+row.wooTableIndex);

                targetChildNode.wooTableIsShow = false;
                setTableChildIsShow(targetChildNode, targetChildNode.wooTableIsShow||false, targetChild);
            }
        }
    }
}
export default (selection, text, row, index, columnItem, columnItemIndex, slots, h)=>{
    let columnItemNode = {};

    if(columnItem.slots && slots[columnItem.slots]){
        columnItemNode =  [
            slots[columnItem.slots]({
                text:text,
                row:row,
                index:index,
                config:columnItem
            })
        ];
    }
    else if(columnItem.render){
        columnItemNode =  [columnItem.render(text, row, index, columnItem)];
    }else{
        columnItemNode = [text];
    }
    if(row.wooTableIsChildren && (selection?columnItemIndex==="1":columnItemIndex==="0")){
        return  [
            h(
                "div",
                {
                    class:{
                        "table-children-group":true
                    }
                },
                [
                    h(
                        "span",
                        {
                            class:{
                                "material-icons":true,
                                "woo-not-select":true,
                                "table-children-action":true
                            },
                            attrs:{
                                id:"woo-table-child-material-icons-"+row.wooTableIndex,
                            },
                            style:{
                                fontSize:"14px"
                            },
                            on:{
                                click:function (e) {

                                    if(e.target.wooTableIsShow){
                                        e.target.wooTableIsShow = !e.target.wooTableIsShow;
                                    }else {
                                        e.target.wooTableIsShow = true;
                                    }
                                    setTableChildIsShow(e.target, e.target.wooTableIsShow, row);
                                }
                            }
                        },
                        [
                            "add"
                        ]
                    ),
                    ...columnItemNode
                ]
            )
        ];
    }else{
        return columnItemNode;
    }
};