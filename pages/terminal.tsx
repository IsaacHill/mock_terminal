import * as terminalLib from "../lib/terminal";
import {useEventListener} from "../lib/useEventListner"
import React, {useState, useEffect} from "react"

let other_node = new terminalLib.FileNode(
  "Lead Scientist",
  "Dr Rover escobar desgraced astrophysist after uncovering the true secrets and powers of astrology", 0, "/mad_scientist.jpg");
let another_node  =  new terminalLib.FileNode(
  "Findings",
  "When working under the correct star sign it is possible to contract [REDACTED]", 0);
let child_nodes = new terminalLib.FileNode("Project Delta","code name project is to do something", 0);
let fileNodeTree = new terminalLib.FileNode("index","access to Tommorowland imagineer research center", 0);
fileNodeTree.addChildNode(child_nodes);
child_nodes.addChildNode(another_node);
child_nodes.addChildNode(other_node);
let terminal = new terminalLib.Terminal("TomorrowLand arcane inquiry", null, fileNodeTree)

export default function Terminal() {
const [current_node, set_current_node] = useState<terminalLib.FileNode>(terminal.initial_node);
const [node_index, setNodeIndex] = useState(0);

  function keyboard_event(e ) {
    console.log("event");
    console.log(e.key);
    console.log(current_node.name);
    let value = 0;
    if (e.key == "ArrowUp") {
     value--;
    } else if(e.key == "ArrowDown") {
      value++;
    }
    console.log(value);
    setNodeValue(value);
  }
   
  const setNodeValue = (value) => {
    console.log("function node",node_index);
    setNodeIndex(node_index+value)
  }
  useEventListener("keydown", keyboard_event)
  // https://usehooks.com/useEventListener/ <===== investigate

  useEffect(() => {
    console.log("reset index");
    setNodeIndex(0);
  }, [current_node]);

  useEffect(() => {
    console.log("triggered change",node_index);
  },[node_index])

    return (
      <div className="terminalContainer">
        <p>{terminal.name}</p>
        <p>{current_node.Path()}</p>
        {current_node.image_path ? <img src={current_node.image_path} /> : null}
        <p>{current_node.info}</p>
        <div>
          {current_node.PossibleSelections().map((node: terminalLib.FileNode, index: number) => {
            return <p key={node.name} className={`${index === node_index ? "selectedNode" : ""} node`} onClick={() => set_current_node(node)}>{node.name}</p>
          })}
        </div>
      </div>
    );
  }