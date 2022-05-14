import {strToNum} from "../tool";

const buildRowAndColSpan = (maxRowLevel, rowIndex=0, columns, isFixed=true, tableTrGroup=[]) => {
    const colgroup = [];
    let colsSize = 0;
    let fixedHeadStartWidth = 0;
    let fixedHeadEndWidth = 0;

    tableTrGroup.push(
        []
    );
    for (const colIndex in columns) {
        const item = columns[colIndex];

        if(item.sorter){
            item.wooTableSorterStatus = 1;
        }
        if(!isFixed){
            delete item.fixed;
        }
        if(item.width && typeof item.width === "string"){
            item.width = strToNum(item.width);
        }
        if (item.children && item.children.length) {
            delete item.fixed;
            const result = buildRowAndColSpan(maxRowLevel, rowIndex + 1, item.children, false, tableTrGroup);

            item.wooTableRowSpan = 1;
            item.wooTableColSpan = result.colsSize;
            colsSize += result.colsSize;
            colgroup.push(...result.colgroup);
        } else {
            colsSize++;
            colgroup.push(item);
            item.wooTableRowSpan = maxRowLevel - rowIndex;
            item.wooTableColSpan = 1;
        }
        item.wooTableStartWidth = fixedHeadStartWidth;
        item.wooTableEndWidth = fixedHeadEndWidth;
        tableTrGroup[rowIndex].push(item);
        if (item.fixed === "start") {
            fixedHeadStartWidth += item.width || 100;
        }

        if (item.fixed === "end") {
            fixedHeadEndWidth +=  item.width || 100;
        }

    }

    return {
        columns,
        colgroup,
        colsSize,
        tableTrGroup
    };
};
const getColumnsLevel = (arr) => {
    let level = 0;

    for (const item of arr) {
        let localLevel = 1;

        if (item.children && item.children.length) {
            localLevel += getColumnsLevel(item.children, localLevel);
        }
        if (level < localLevel) {
            level = localLevel;
        }
    }
    return level;
};


function sortDataSource(isChildren, columns, level=0, wooTableIndex=0) {
    for(const index in columns){
        const item = columns[index];

        item.wooTableIndex = wooTableIndex + "-" + index;
        item.wooTableTargetIndex = index;
        item.wooTableIsChildren = !!(isChildren && item.children && item.children.length);
        item.wooTableIsShow = true;
        item.wooTableTargetIsShow = true;
        item.wooTablelevel=level;
        item.wooTableChecked=false;
        if(isChildren && item.children&&item.children.length){
            sortDataSource(isChildren, item.children, level+1, item.wooTableIndex);
        }
    }
    return columns;
}




function sortDataSourceMap(dataSource) {
    const map = {};

    dataSource.map(item=>{
        map[item.wooTableIndex] = item;
    });
    return map;
}


function renderChildren(isChildren, selection, row, rowIndex, index, slot, callback, h) {
    if(isChildren){
        const render = h(
            "div",
            {
                class:{
                    "table-children-group":true
                }
            },
            [
                h(
                    "WIcon",
                    {
                        class:{
                            "table-children-action":true,
                            [row.wooTableTargetIsShow]:true
                        },
                        attrs:{
                            id:"woo-table-child-material-icons-"+row.wooTableIndex,
                            size:"14px"
                        },
                        on:{
                            click:function () {
                                callback(rowIndex, row);
                            }
                        }
                    },
                    row.wooTableTargetIsShow?"add":"remove"
                ),
                slot
            ]
        );

        if(selection && index ==="1"){
            return  render;
        }else if(index === 0){
            return  render;
        }
    }
    return slot;
}


function setTableTrChildClose(dataSourceItem) {
    for(const item of dataSourceItem.children){
        item.wooTableIsShow = false;
    }
}


function getTitleNode(column, h, sorterF) {
    if(column.sorter){
        return h(
            "div",
            {
                class:{
                    "woo-table-sorter-group":true,
                },
                on: {
                    click:(e)=>{
                        if(column.wooTableSorterStatus === 1){
                            e.target.classList.add("woo-table-sorter-group-up");
                            e.target.classList.remove("woo-table-sorter-group-down");
                        }
                        if(column.wooTableSorterStatus === 2){
                            e.target.classList.add("woo-table-sorter-group-down");
                            e.target.classList.remove("woo-table-sorter-group-up");

                        }
                        if(column.wooTableSorterStatus === 3){
                            e.target.classList.remove("woo-table-sorter-group-up");
                            e.target.classList.remove("woo-table-sorter-group-down");
                        }
                        sorterF();
                    }
                }
            },
            [
                column.title,
                h(
                    "WTableSorter"
                )
            ]
        );
    }else{
        return column.title;
    }

}
export {
    buildRowAndColSpan,
    getColumnsLevel,
    sortDataSource,
    renderChildren,
    sortDataSourceMap,
    setTableTrChildClose,
    getTitleNode
};