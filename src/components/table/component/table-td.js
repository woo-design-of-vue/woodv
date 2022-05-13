export default {
    name: "WTableTh",
    functional:true,
    render: function (h, context) {
        const column = context.props.column;
        const source = context.props.source;
        const selection = context.props.selection;
        const index = context.props.index;

        return h(
            "td",
            {
                class: {
                    "woo-table-th": true,
                    "woo-table-ellipsis": column.ellipsis,
                    "woo-table-fixed-start":column.fixed === "start",
                    "woo-table-fixed-end": column.fixed === "end"
                },
                style: {
                    textAlign: column.align,
                    position: column.fixed ? "sticky" : "",
                    left:column.fixed === "start"?column.wooTableStartWidth+"px":"",
                    right:column.fixed === "end"?column.wooTableEndWidth+"px":"",
                    paddingLeft:(selection?index==="1":index==="0")?source.wooTablelevel*15 + 5+"px":"5px"
                }
            },
            [
                context.slots().default
            ]
        );
    }
};