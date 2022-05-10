
import tableHeaderColumns from "../../util/function/table-header-columns";
import tableBodyColumns from "../../util/function/table-body-columns";
import tableCheckboxWatch from "../../util/function/table-checkbox-watch";
export default {
    name: "WTable",
    props: {
        columns: {
            type: Array,
            required: true,
            default: () => {
                // {
                //     dataIndex: "name",
                //         title: "姓名",
                //     width: "200px",
                //     align: "left",
                //     slots: "slots",
                //     render: (text,row,index,config) => {
                // },
                //     fixed: "start"
                // }
                return [];
            }
        },
        dataSource: {
            type: Array,
            required: true,
            default: () => {
                return [];
            }
        },
        width: {
            type: [String, Number],
            required: false,
            default: ""
        },
        height: {
            type: [String, Number],
            required: false,
            default: ""
        },
        rowKey: {
            type: String,
            required: false,
            default: ""
        },
        targetClass: {
            type: String,
            required: false,
            default: ""
        },
        children:{
            type: Boolean,
            required: false,
            default: false
        },
        selection:{
            type: Boolean,
            required: false,
            default: false
        }
    },
    mounted() {
        const tableGroupNode = this.$refs["woo-table-group"];

        if (tableGroupNode.scrollLeft > 0) {
            tableGroupNode.classList.add("woo-table-group-fixed-start");
        }
        if (tableGroupNode.scrollLeft <= 0) {
            tableGroupNode.classList.remove("woo-table-group-fixed-start");
        }
        if (tableGroupNode.scrollWidth - tableGroupNode.scrollLeft - tableGroupNode.offsetWidth) {
            tableGroupNode.classList.add("woo-table-group-fixed-end");
        }
        if (tableGroupNode.scrollWidth - tableGroupNode.scrollLeft - tableGroupNode.offsetWidth <= 0) {
            tableGroupNode.classList.remove("woo-table-group-fixed-end");
        }
    },
    methods: {},
    render: function (h) {
        const cloneColumns = JSON.parse(JSON.stringify(this.columns));

        if(cloneColumns.length >0){
            if(cloneColumns[0].fixed){
                cloneColumns.unshift({
                    wooTableType:"checkbox",
                    width:"60px",
                    fixed:"start",
                    align:"center"
                });
            }else{
                cloneColumns.unshift({
                    wooTableType:"checkbox",
                    width:"60px",
                    align:"center"
                });
            }
        }else{
            cloneColumns.unshift({
                wooTableType:"checkbox",
                width:"60px",
                align:"center"
            });
        }
        const {tableList} = tableBodyColumns(this, cloneColumns);
        const {colgroupList, tableHeader} = tableHeaderColumns(this, cloneColumns);

        return h(
            "div",
            {
                class: {
                    "woo-table-group": true,
                    [this.targetClass]: true
                },
                style: {
                    maxWidth: this.width,
                    maxHeight: this.height
                },
                ref: "woo-table-group",
                on: {
                    load: (e) => {
                        console.log(e);
                    },
                    scroll: (e) => {
                        if (e.target.scrollLeft > 0) {
                            e.target.classList.add("woo-table-group-fixed-start");
                        }
                        if (e.target.scrollLeft <= 0) {
                            e.target.classList.remove("woo-table-group-fixed-start");
                        }
                        if (e.target.scrollWidth - e.target.scrollLeft - e.target.offsetWidth) {
                            e.target.classList.add("woo-table-group-fixed-end");
                        }
                        if (e.target.scrollWidth - e.target.scrollLeft - e.target.offsetWidth <= 1) {
                            e.target.classList.remove("woo-table-group-fixed-end");
                        }
                    }
                }
            },
            [
                h(
                    "div",
                    {
                        class: {
                            "woo-table-header": true
                        }
                    },
                    [
                        h(
                            "table",
                            {
                                class: {
                                    "woo-table": true
                                },
                                attrs: {
                                    cellspacing: 0,
                                    cellpadding: 0,
                                    border: 0
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
                                        "woo-table-thead": true
                                    },
                                    tableHeader
                                )
                            ]
                        )
                    ]
                ),
                h(
                    "div",
                    {
                        class: {
                            "woo-table-body": true
                        }
                    },
                    [
                        h(
                            "table",
                            {
                                class: {
                                    "woo-table": true
                                },
                                attrs: {
                                    cellspacing: 0,
                                    cellpadding: 0,
                                    border: 0
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
                                        "woo-table-thead": true
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