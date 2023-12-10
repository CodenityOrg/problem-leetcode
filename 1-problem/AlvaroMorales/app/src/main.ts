//contruccion de un nodo unico
class Nodo {
    value: number;
    next: Nodo | null;
    constructor(value:number){
        this.value = value;
        this.next = null;
    }
}  

//construccion de una lista de nodos
class ListNodos {
    head: Nodo | any;
    value: any;
    next!: ListNodos | null;
    constructor() {
        this.head = null;
    }
    
    addNode(value:number){
        const node = new Nodo(value);
        if(this.head == null){
            this.head = node;
        }
        else{
            let current = this.head;
            while(current.next != null){
                current = current.next;
            }
            current.next = node;
        }
    }
    addList(list:ListNodos | any){
        list = list;
        let current = this.head;
        while(current.next != null){
            current = current.next;
        }
        current.next = list;
    }
}


const list1 = new ListNodos();
const list2 = new ListNodos();

list1.addNode(1);
list1.addNode(2);
list1.addNode(4);

list2.addNode(1);
list2.addNode(3);
list2.addNode(4);
// console.log(JSON.stringify(list1.head));

const mergeTwoLists = (list1: ListNodos | null, list2: ListNodos | null)=> {
    list1 = list1?.head;
    list2 = list2?.head;
    let listUni = new ListNodos();
    while(list1 !== null && list2 !== null){
        if(list1.value < list2.value){
            listUni.addNode(list1.value);
            list1 = list1.next;
        }
        else{
            listUni.addNode(list2.value);
            list2 = list2.next;
        }
        console.log("dentro->",JSON.stringify(listUni));
    }
    list1 == null ?  listUni.addList(list2) : listUni.addList(list1);
    console.log(list1 == null ?  list2 : list1);
    console.log("fuera->",JSON.stringify(listUni));
    return listUni;
};

const listCompleted = mergeTwoLists(list1,list2);

console.log(JSON.stringify(listCompleted));

//{"head":{"value":1,"next":{"value":1,"next":{"value":2,"next":{"value":3,"next":{"value":4,"next":{"value":4,"next":null}}}}}}}