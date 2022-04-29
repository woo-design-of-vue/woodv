import "material-design-icons-iconfont";
export default (text, row, index, columnItem, columnItemIndex, slots, h)=>{
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
    if(row.wooTableIsChildren && columnItemIndex==="0"){
        let openChild = false;

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
                            style:{
                                fontSize:"14px"
                            },
                            on:{
                                click:function (e) {
                                    openChild = !openChild;
                                    const targetList = document.getElementsByClassName("woo-table-target-"+row.wooTableIndex);

                                    if(openChild){
                                        e.target.innerText = "remove";
                                        for(const targetNode of targetList){
                                            targetNode.style.display = "table-row";
                                        }
                                    }else{
                                        e.target.innerText = "add";
                                        for(const targetNode of targetList){
                                            targetNode.style.display = "none";
                                        }
                                    }

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