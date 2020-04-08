import * as terminalLib from "../lib/terminal";
import {useEventListener} from "../lib/useEventListner"
import React, {useState, useEffect, useCallback} from "react"
import { TypeWriter } from "../components/TypeWriter";

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
const [current_node, setCurrentNode] = useState<terminalLib.FileNode>(terminal.initial_node);
const [node_index, setNodeIndex] = useState<number>(0);

  const keyboard_event =  useCallback(
    ({ key }) => {
      if (key == "Enter") {
        setCurrentNode(current_node.PossibleSelections()[node_index]);
        return
      }
      let index = node_index
      if (key == "ArrowUp") {
        index = index === 0 ? current_node.PossibleSelections().length-1 : index-1;
      } else if(key == "ArrowDown") {
        index = index === current_node.PossibleSelections().length ? 0 : index+1;
      }

      setNodeIndex(index)
    },
    [setNodeIndex, node_index, current_node]
  );
  
   
    useEventListener("keydown", keyboard_event)
  // https://usehooks.com/useEventListener/ <===== investigate

  useEffect(() => {
    setNodeIndex(0);
  }, [current_node]);

  useEffect(() => {
  },[node_index])

    return (
      <div className="terminalContainer">
        <TypeWriter speed={10}>{terminal.name}</TypeWriter>
        <TypeWriter speed={12}>{current_node.Path()}</TypeWriter>
        {current_node.image_path ? <img src={current_node.image_path} /> : null}
        <TypeWriter speed={5}>{current_node.info}</TypeWriter>
        <div>
          {current_node.PossibleSelections().map((node: terminalLib.FileNode, index: number) => {
            return <p key={node.name} className={`${index === node_index ? "selectedNode" : ""} node`} onClick={() => setCurrentNode(current_node.PossibleSelections()[index]) }>{node.name}</p>
          })}
        </div>
      </div>
    );
  }