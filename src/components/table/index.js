import tableRender from "../../util/function/tableRender";
export default {
    name:"WTable",
    props:{
        columns:{
            type:Array,
            required:true,
            default:()=>{
                return [];
            }
        },
        dataSource:{
            type:Array,
            required:true,
            default:()=>{
                return [];
            }
        },
        width: {
            type:[String, Number],
            required:true,
            default:""
        },
        height: {
            type:[String, Number],
            required:true,
            default:""
        }
    },
    methods:{

    },
    render:function (h) {
        const colgroupList = [];
        const tableHeader =  h(
            "tr",
            {
                "woo-table-tr":true
            },
            []
        );
        const tableList = [];
        let fixedHeadStartWidth = 0;
        let fixedHeadEndWidth = 0;
        let fixedHeadEndVisible = false;

        for(const index in this.dataSource){
            let fixedBodyStartWidth = 0;
            let fixedBodyEndWidth = 0;
            const item = this.dataSource[index];
            const tableNode = h(
                "tr",
                {
                    class:{
                        "woo-table-tr":true
                    }
                },
                []
            );

            for(const childIndex in this.columns){
                const child = this.columns[childIndex];
                const childNode = h(
                    "td",
                    {
                        class:{
                            "woo-table-th":true,
                            "woo-table-ellipsis":child.ellipsis,
                            "woo-table-fixed-start":child.fixed ==="start",
                            "woo-table-fixed-end":child.fixed ==="end"
                        },
                        style:{
                            textAlign:child.align,
                            position:child.fixed?"sticky":"",
                            left:child.fixed ==="start"?fixedBodyStartWidth:"",
                            right:child.fixed ==="end"?fixedBodyEndWidth:""
                        }
                    },
                    tableRender(item[child.dataIndex], item, index, child, this.$scopedSlots)
                );

                if(child.fixed === "start"){
                    fixedBodyStartWidth += child.width || 100;
                }
                if(child.fixed === "end"){
                    fixedBodyEndWidth += child.width || 100;
                }
                tableNode.children.push(childNode);
            }
            tableList.push(tableNode);
        }



        for(const index in this.columns){
            const item = this.columns[index];

            colgroupList.push(h(
                "col",
                {
                    "woo-table-th":true,
                    attrs:{
                        "data-key":item.dataIndex
                    },
                    style:{
                        width:item.width
                    }
                }
            ));
            tableHeader.children.push(h(
                "th",
                {
                    class:{
                        "woo-table-th":true,
                        "woo-table-ellipsis":item.ellipsis,
                        "woo-table-fixed-start":item.fixed ==="start",
                        "woo-table-fixed-end":item.fixed ==="end"
                    },
                    style:{
                        textAlign:item.align,
                        position:item.fixed?"sticky":"",
                        left:item.fixed ==="start"?fixedHeadStartWidth:"",
                        right:item.fixed ==="end"?fixedHeadEndWidth:""
                    }
                },
                [
                    item.title
                ]
            ));
            if(item.fixed === "start"){
                fixedHeadStartWidth += item.width || 100;
            }
            if(item.fixed === "end"){
                fixedHeadEndWidth += item.width || 100;
                fixedHeadEndVisible = true;
            }
        }



        return h(
            "div",
            {
                class:{
                    "woo-table-group":true,
                    "woo-table-group-fixed-end":fixedHeadEndVisible
                },
                style:{
                    width:this.width,
                    height: this.height
                },
                on:{
                    load:(e)=>{
                        console.log(e);
                    },
                    scroll:(e)=>{
                        if(e.target.scrollLeft > 0){
                            e.target.classList.add("woo-table-group-fixed-start");
                        }
                        if(e.target.scrollLeft <= 0){
                            e.target.classList.remove("woo-table-group-fixed-start");
                        }
                        if(e.target.scrollWidth -e.target.scrollLeft  - e.target.offsetWidth){
                            e.target.classList.add("woo-table-group-fixed-end");
                        }
                        if(e.target.scrollWidth -e.target.scrollLeft  - e.target.offsetWidth <= 0){
                            e.target.classList.remove("woo-table-group-fixed-end");
                        }
                    }
                }
            },
            [
                h(
                    "div",
                    {
                        class:{
                            "woo-table-header":true
                        }
                    },
                    [
                        h(
                            "table",
                            {
                                class:{
                                    "woo-table":true
                                },
                                attrs:{
                                    cellspacing:0,
                                    cellpadding:0,
                                    border:0
                                }
                            },
                            [
                                h(
                                    "colgroup",
                                    {},
                                    colgroupList
                                ),
                                h(
                                    "thead",
                                    {
                                        "woo-table-thead":true
                                    },
                                    [tableHeader]
                                )
                            ]
                        )
                    ]
                ),
                h(
                    "div",
                    {
                        class:{
                            "woo-table-body":true
                        }
                    },
                    [
                        h(
                            "table",
                            {
                                class:{
                                    "woo-table":true
                                },
                                attrs:{
                                    cellspacing:0,
                                    cellpadding:0,
                                    border:0
                                }
                            },
                            [
                                h(
                                    "colgroup",
                                    {},
                                    colgroupList
                                ),
                                h(
                                    "thead",
                                    {
                                        "woo-table-thead":true
                                    },
                                    tableList
                                )
                            ]
                        )
                    ]
                )
            ]
        );
    }
};