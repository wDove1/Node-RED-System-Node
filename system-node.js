module.exports = function (RED) {
    function SystemNode(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        var outputToMsg = config.outputToMsg;

        node.on('input', async function (msg) {
            let thingFunctionValue = JSON.parse(config.thingFunctionValue);
            console.log("thingFunctionValue");
            console.log(thingFunctionValue);

            let thingURI = thingFunctionValue.uri;
            let action = thingFunctionValue.action;

            console.log(thingFunctionValue);

            let output = await fetch(
                thingURI + "/actions/" + action, 
                {
                    method: "POST",
                    headers: new Headers({
                        "Access-Control-Allow-Origin": "*",
                    }),
                    body: msg.payload //Should be a list of parameters
                }
            )
            .catch((reason) => {
                node.error("Failed to invoke action", reason);
            });

            if (outputToMsg) {
                msg.payload = output;
            }

            node.send(msg);
        });
    }

    RED.nodes.registerType("system-node", SystemNode);
}