export interface TerminalInfo {
    name: string;
    image: string;
}



export class FileNode {
    name: string;
    child_nodes: FileNode[];
    previous_node: FileNode | null;
    info: string;
    image_path: string | null;
    clearance_required: number;

    constructor(name: string, info: string, clearance_required: number, image_path?: string) {
        this.name = name.replace(" ","_");
        this.info = info;
        this.clearance_required = clearance_required;
        this.child_nodes = [];
        this.image_path = image_path ? image_path : null;
    }

    PossibleSelections() :FileNode[] {
        if (this.previous_node) {
            return [this.previous_node, ...this.child_nodes];
        }
        return this.child_nodes;
    }

    SetParent(node: FileNode) {
        this.previous_node = node;
    }

    addChildNode(node :FileNode) {
        node.SetParent(this);
        this.child_nodes.push(node);
    }

    Path() :string {
        if (this.previous_node == null) {
            return this.name;
        } else {
            return this.previous_node.Path()+"/"+this.name;
        }
    }

    CanAccess(user: User) :boolean {
        return true;
    }
}

export interface User {
    name: string;
    password: string;
    clearance_level: number
}


export class Terminal {
    name: string;
    image: string | null;
    initial_node: FileNode;

    constructor(name: string, image: string, initial_node: FileNode) {
        this.name = name;
        this.image = image;
        this.initial_node = initial_node
    }

    SetCurrentNode(node: FileNode) {
        this.initial_node = node;
    }
}
