module.exports = function (RED) {
    function SystemActionNode(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        var outputToMsg = config.outputToMsg;

        node.on('input', async function (msg, send, done) {
            let thingActionValue = JSON.parse(config.thingActionValue);

            let thingURI = thingActionValue.uri;
            let action = thingActionValue.action;

            let output = await fetch(
                thingURI + "/actions/" + action, 
                {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(msg.payload) //Should be a list of parameters
                }
            )
            .catch((reason) => {
                node.error("Failed to invoke action", reason);
            });

            if (outputToMsg) {
                msg.payload = await output.json();
            }

            node.send(msg);
        });
    }

    RED.nodes.registerType("system-action-node", SystemActionNode);
}