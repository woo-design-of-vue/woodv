import tableRender from "./tableRender";
import tableRenderCheckbox from "./tableRenderCheckbox";

function sortColumns(columns, isFixed=true) {
    const columnsList = [];

    for(const index in columns){
        const item = columns[index];

        if(!isFixed){
            delete item.fixed;
        }
        if(item.width && typeof item.width !== "number"){
            item.width = Number(item.width.replace(/[^\d]/g, ""));
        }
        if(item.children&&item.children.length){
            columnsList.push(...sortColumns(item.children, false));
        }else{
            columnsList.push(item);
        }
    }

    return columnsList;

}

const sortDataSource = (dataSource, isChildren, targetIndex="0", isShow=true, level=0)=>{
    const dataSourceList = [];

    for(const index in dataSource){
        const item = dataSource[index];
        const childTargetIndex = targetIndex + "-" + index;

        item.wooTableIndex = childTargetIndex;
        item.wooTableTargetIndex = targetIndex;
        item.wooTableIsChildren = false;
        item.wooTableIsShow = isShow;
        item.wooTablelevel=level;
        dataSourceList.push(item);
        if(isChildren && item.children&&item.children.length){
            item.wooTableIsChildren = true;
            dataSourceList.push(...sortDataSource(item.children, isChildren, childTargetIndex, false, level+1));
        }
    }
    return dataSourceList;
};

export default (vueProperty, columns)=>{
    console.timeStamp("render");
    const {selection, children:isChildren, dataSource, rowKey, $scopedSlots, $createElement:h} = vueProperty;

    const tableList = [];
    const cloneColumns = sortColumns(columns);

    const cloneDataSource = sortDataSource(JSON.parse(JSON.stringify(dataSource)), isChildren);

    for (const index in cloneDataSource) {
        const item = cloneDataSource[index];
        let fixedBodyStartWidth = 0;
        let fixedBodyEndWidth = 0;
        const trChildNodes = [];

        for(const childIndex in cloneColumns){

            const child = cloneColumns[childIndex];
            let childNode = {};

            let render = tableRender(selection, item[child.dataIndex], item, index, child, childIndex, $scopedSlots, h);

            if(selection && childIndex==="0"){
                render = [tableRenderCheckbox(h, (e)=>{console.log(e);})];
            }
            childNode = h(
                "td",
                {
                    class: {
                        "woo-table-th": true,
                        "woo-table-ellipsis": child.ellipsis,
                        "woo-table-fixed-start":child.fixed === "start",
                        "woo-table-fixed-end": child.fixed === "end"
                    },
                    style: {
                        textAlign: child.align,
                        position: child.fixed ? "sticky" : "",
                        left:child.fixed === "start"?fixedBodyStartWidth+"px":"",
                        right:child.fixed === "end"?fixedBodyEndWidth+"px":"",
                        paddingLeft:(selection?childIndex==="1":childIndex==="0")?item.wooTablelevel*15 + 5+"px":"5px"
                    }
                },
                render
            );

            if (child.fixed === "start") {
                fixedBodyStartWidth += Number(child.width) || 100;
            }
            if (child.fixed === "end") {
                fixedBodyEndWidth += Number(child.width) || 100;
            }
            trChildNodes.push(childNode);
        }
        const tableNode = h(
            "tr",
            {
                class: {
                    "woo-table-tr": true,
                    ["woo-table-target-"+item.wooTableTargetIndex]:true,
                },
                attrs:{
                    id:"woo-table-level-"+item.wooTablelevel+"-"+item.wooTableIndex,
                },
                style:{
                    display:item.wooTableIsShow?"table-row":"none"
                },
                key: item[rowKey] || item.wooTableIndex || index
            },
            trChildNodes
        );

        tableList.push(tableNode);
    }
    console.timeEnd("render");
    return {
        tableList
    };
};