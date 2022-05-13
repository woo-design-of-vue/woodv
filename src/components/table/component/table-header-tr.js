import WTableTh from "./table-th.js";
export default {
    name: "WTableHeaderTr",
    components:{
        WTableTh
    },
    props:{
        tableTrGroup:{
            type:Array,
            required:true,
            default:()=>{
                return[];
            }
        },
        selection:{
            type: Boolean,
            required: false,
            default: false
        },
        isHeaderChecked:{
            type: Boolean,
            required: false,
            default: false
        }
    },
    render: function (h) {
        const tableTrGroup = this.tableTrGroup;
        const selection = this.selection;
        const tableTrList = [];

        for(const index in tableTrGroup){
            const item = tableTrGroup[index];
            const tableThGroup = [];

            for(const child of item){
                tableThGroup.push(h(
                    "WTableTh",
                    {
                        attrs:{
                            column:child,
                            selection:selection,
                            isHeaderChecked:this.isHeaderChecked
                        }
                    }
                ));

            }

            tableTrList.push(
                h(
                    "tr",
                    {
                        "woo-table-tr": true
                    },
                    tableThGroup
                )
            );

        }
        return h(
            "thead",
            {
                "woo-table-thead": true
            },
            tableTrList
        );
    }
};