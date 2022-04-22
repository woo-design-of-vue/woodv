import tableRender from "./tableRender";

const getBodyColumns = ( item, index, columns, isFixed, $scopedSlots, h)=>{
    let fixedBodyStartWidth = 0;
    let fixedBodyEndWidth = 0;
    const tableNode = [];

    for (const childIndex in columns) {
        const child = columns[childIndex];

        if(child.children&&child.children.length){
            tableNode.push(...getBodyColumns(item, index, child.children, false, $scopedSlots, h));
        }else{
            const childNode = h(
                "td",
                {
                    class: {
                        "woo-table-th": true,
                        "woo-table-ellipsis": child.ellipsis,
                        "woo-table-fixed-start": isFixed && child.fixed === "start",
                        "woo-table-fixed-end": isFixed && child.fixed === "end"
                    },

                    style: {
                        textAlign: child.align,
                        position: isFixed && child.fixed ? "sticky" : "",
                        left: isFixed && child.fixed === "start" ? fixedBodyStartWidth : "",
                        right: isFixed && child.fixed === "end" ? fixedBodyEndWidth : ""
                    }
                },
                tableRender(item[child.dataIndex], item, index, child, $scopedSlots)
            );

            if (child.fixed === "start") {
                fixedBodyStartWidth += child.width || 100;
            }
            if (child.fixed === "end") {
                fixedBodyEndWidth += child.width || 100;
            }
            tableNode.push(childNode);
        }
    }
    return tableNode;
};

export default (dataSource, columns, rowKey, $scopedSlots, h)=>{
    const tableList = [];

    for (const index in dataSource) {

        const item = dataSource[index];
        const tableNode = h(
            "tr",
            {
                class: {
                    "woo-table-tr": true
                },
                key: item[rowKey]
            },
            []
        );

        tableNode.children.push(...getBodyColumns(item, index, columns, true, $scopedSlots, h));
        tableList.push(tableNode);
    }
    return {
        tableList
    };
};