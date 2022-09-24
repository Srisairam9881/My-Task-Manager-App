import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
providedIn: 'root'
})
export class TaskService {

constructor(private webReqService: WebRequestService) { }


getLists() {
return this.webReqService.get('lists');
}

createList(title: string) {
// We want to send a web request to create a list
return this.webReqService.post('lists', { title });
}

updateList(id: string, title: string) {
// We want to send a web request to update a list
return this.webReqService.patch(`lists/${id}`, { title });
}

updateTask(listId: string, taskId: string, title: string,note:string,date:string) {
// We want to send a web request to update a list
return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title,note,date });
}

deleteTask(listId: string, taskId: string) {
return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
}

deleteList(id: string) {
return this.webReqService.delete(`lists/${id}`);
}

getTasks(listId: string,completed: Boolean) {
return this.webReqService.get(`lists/${listId}/tasks/`+completed);
}

createTask(title: string,note:string,date:string,listId: string) {
// We want to send a web request to create a task
return this.webReqService.post(`lists/${listId}/tasks`, { title,note,date });
}

complete(task: Task) {
return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
completed: !task.completed
});
}

}
