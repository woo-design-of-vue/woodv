export default {
    name:"WPage",
    props:{
        pagination:{
            type: Object,
            required: false,
            default: ()=>{
                return {
                    pageSize:10,
                    current:1,
                    pageSizeOptions: ["10", "20", "30"],
                    total: 0
                };
            }
        }
    },
    render:function (h) {
        return h(
            "div",
            {
                class:{
                    "woo-table-page":true
                }
            },

        );
    }
};