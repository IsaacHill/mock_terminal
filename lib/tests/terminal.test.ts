import { Terminal, FileNode } from "../terminal"

let other_node = new FileNode(
    "Lead Scientist",
    "Dr Rover escobar desgraced astrophysist after uncovering the true secrets and powers of astrology",
      0);
  let another_node  =  new FileNode(
    "Findings",
    "When working under the correct star sign it is possible to contract [REDACTED]",
      0);
  let child_nodes = new FileNode("Project Delta","code name project is to do something", 0);
  let fileNodeTree = new FileNode("index","access to Tommorowland imagineer research center", 0);
  fileNodeTree.addChildNode(child_nodes);
  child_nodes.addChildNode(other_node);
  another_node.addChildNode(another_node);
  let terminal = new Terminal("TomorrowLand arcane inquiry", null, fileNodeTree)
test("FileNode", () => {
    describe("Path", () => {
        expect(child_nodes.previous_node).toEqual(fileNodeTree);
        expect(other_node.Path()).toEqual("index/Project_Delta/Lead_Scientist");
    });
})

test("currentNode", () => {
    expect(terminal.current_node).toEqual(fileNodeTree);
    terminal.SetCurrentNode(other_node);
    expect(terminal.current_node).toEqual(other_node);
});