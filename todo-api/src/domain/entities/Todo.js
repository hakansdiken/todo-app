export class Todo {
  constructor({ 
    id, 
    content, 
    is_done = false, 
    created_date = new Date(), 
    updated_date = new Date() 
  }) {
    this.id = id;
    this.content = content;
    this.is_done = is_done;
    this.created_date = created_date;
    this.updated_date = updated_date;
  }
}
