class TodoProps {
    constructor(name, state = true, id){

        this.name = name;
        this.state = state;
        this.id=this.generateUniqueId()
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36);
      }
}

export default TodoProps;