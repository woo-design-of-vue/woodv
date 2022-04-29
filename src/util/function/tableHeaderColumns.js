const getArrMaxLevel = (arr) => {
    let level = 0;

    for (const item of arr) {
        let localLevel = 1;

        if (item.children && item.children.length) {
            localLevel += getArrMaxLevel(item.children, localLevel);
        }
        if (level < localLevel) {
            level = localLevel;
        }
    }
    return level;
};
const buildRowAndColSpan = (maxRowLevel, rowIndex, columns, tableHeader = [], h, isFixed = true) => {
    let colsSize = 0;
    const colgroupList = [];
    let fixedHeadStartWidth = 0;
    let fixedHeadEndWidth = 0;

    tableHeader.push(h(
        "tr",
        {
            "woo-table-tr": true
        },
        []
    ));
    for (const colIndex in columns) {
        const item = columns[colIndex];

        if(!isFixed){
            delete item.fixed;
        }

        if(item.width && typeof item.width !== "number"){
            item.width = Number(item.width.replace(/[^\d]/g, ""));
        }
        if (item.children && item.children.length) {
            const result = buildRowAndColSpan(maxRowLevel, rowIndex + 1, item.children, tableHeader, h, false);

            delete item.fixed;
            item.rowSpan = 1;
            item.colSpan = result.colsSize;
            colsSize += result.colsSize;
            colgroupList.push(...result.colgroupList);
        } else {
            colsSize++;
            item.rowSpan = maxRowLevel - rowIndex;
            item.colSpan = 1;
            colgroupList.push(h(
                "col",
                {
                    "woo-table-th": true,
                    attrs: {
                        "data-key": item.dataIndex
                    },
                    style: {
                        width: item.width+"px"
                    }
                }
            ));
        }
        tableHeader[rowIndex].children.push(h(
            "th",
            {
                class: {
                    "woo-table-th": true,
                    "woo-table-ellipsis": item.ellipsis,
                    "woo-table-fixed-start":item.fixed === "start",
                    "woo-table-fixed-end": item.fixed && item.fixed === "end"
                },
                style: {
                    textAlign: item.align,
                    position: item.fixed && item.fixed ? "sticky" : "",
                    left: item.fixed && item.fixed === "start" ? fixedHeadStartWidth +"px": "",
                    right: item.fixed && item.fixed === "end" ? fixedHeadEndWidth+"px" : ""
                },
                attrs: {
                    rowspan: item.rowSpan,
                    colspan: item.colSpan
                }
            },
            [
                item.title
            ]
        ));
        if (item.fixed === "start") {
            fixedHeadStartWidth += item.width || 100;
        }

        if (item.fixed === "end") {
            fixedHeadEndWidth += item.width || 100;
        }


    }
    return {
        colsSize,
        columns,
        colgroupList,
        tableHeader
    };
};


const tableHeaderColumns = (columns, h) => {
    const maxLevel = getArrMaxLevel(JSON.parse(JSON.stringify(columns)));
    const {colgroupList, tableHeader} = buildRowAndColSpan(maxLevel, 0, JSON.parse(JSON.stringify(columns)), [], h);

    return {
        colgroupList,
        tableHeader
    };
};

export default tableHeaderColumns;