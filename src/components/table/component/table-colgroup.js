export default {
    name: "WTableColgroup",
    props:{
        columns:{
            type:Array,
            required:true,
            default:()=>{
                return[];
            }
        }
    },
    render: function (h) {
        const columns = this.columns;
        const colgroupList = [];

        for(const item of columns){
            colgroupList.push(
                h(
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
                )
            );
        }
        return h(
            "colgroup",
            {},
            colgroupList
        );
    }
};