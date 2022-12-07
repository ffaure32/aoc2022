import "./extensions.ts";

class Element {
    name: string;
    parent: Directory;

    constructor(name: string, parent: Directory) {
        this.name = name;
        this.parent = parent;
    }

    getSize() : number { return 0 };
}

class Directory extends Element {
    children: Map<string, Element>;
    computedSize: number;
    constructor(name: string, parent: Directory);
    constructor(name: string);
    public constructor(...myarray: any[]) {
        super(myarray[0], myarray[1]);
        this.children = new Map<string, Element>();
        this.computedSize = -1;
    }

    getSize() : number {
        return this.computedSize >= 0 ? this.computedSize :
            Array.from(this.children.values())
            .map((e) => e.getSize())
            .sum();
    }

    isRoot() : boolean {
        return this.name === '/';
    }
}
class File extends Element {
    size: number;

    constructor(name: string, parent: Directory, size: number) {
        super(name, parent);
        this.size = size;
    }

    getSize() : number {
        return this.size;
    }
}

export class FileSystem {
    private readonly TOTAL_SPACE = 70000000;
    private readonly MIN_SPACE = 30000000;

    rootDirectory : Directory;
    currentDirectory : Directory;
    directories:Map<string, Directory>;

    constructor() {
        this.rootDirectory = new Directory("/");
        this.currentDirectory = this.rootDirectory;
        this.directories = new Map<string, Directory>();
    }

    parseLine(line: string) {
        if(line.startsWith("$")) {
            if(line.substring(2, 4) === "cd") {
                // cd
                const target = line.slice(5);
                switch (target) {
                    case "..": // back
                        this.currentDirectory = this.currentDirectory.parent;
                        break;
                    case "/": // root
                        this.currentDirectory = this.rootDirectory;
                        break;
                    default: // new directory
                        let key = this.fullName(target);
                        this.currentDirectory = this.directories.get(key) || this.rootDirectory;
                        break;
                }
            } else {
                // ls
            }
        } else if(line.startsWith("dir")) {
            // dir
            const dirName = this.fullName(line.slice(4));
            if(!this.directories.has(dirName)) {
                const newDir = new Directory(dirName, this.currentDirectory);
                this.directories.set(dirName, newDir);
                this.currentDirectory.children.set(dirName, newDir);
            }
        } else {
            // file
            const parts = line.split(" ");
            let fileName = this.fullName(parts[1]);
            const newFile = new File(fileName, this.currentDirectory, Number(parts[0]));
            this.currentDirectory.children.set(fileName, newFile);
        }
    }

    private readonly SEPARATOR = '/';

    fullName(name: string) {
        const suffix = this.SEPARATOR+name;
        return this.currentDirectory.isRoot() ? suffix : this.currentDirectory.name+suffix;
    }

    totalSize(): number {
        return Array.from(this.directories.values())
            .map(dir => dir.getSize())
            .filter(size => size<=100000)
            .sum();
    }

    spaceToFree(): number {
        return this.MIN_SPACE-(this.TOTAL_SPACE - this.rootDirectory.getSize());
    }

    findSpaceFreed(): number {
        const spaceToFree: number = this.spaceToFree();
        let minimalDiff = Array.from(this.directories.values())
            .map(dir => dir.getSize() -spaceToFree)
            .filter(diff => diff >= 0)
            .reduce((minDiff, diff) => diff < minDiff ? diff : minDiff, this.TOTAL_SPACE);
        return minimalDiff+spaceToFree;
    }
}

export function buildFileSystem(lines: Array<string>): FileSystem {
    let fileSystem = new FileSystem();
    lines.slice(1).filter(s => s !== '')
        .forEach(l => fileSystem.parseLine(l));
    return fileSystem;
}
