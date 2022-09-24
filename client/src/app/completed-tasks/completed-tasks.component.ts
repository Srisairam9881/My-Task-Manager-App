import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import { AuthService } from 'src/app/auth.service';

@Component({
selector: 'app-completed-tasks',
templateUrl: './completed-tasks.component.html',
styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent implements OnInit {

lists!: List[];
tasks!: Task[];

selectedListId!: string;

constructor(private taskService: TaskService,private auth:AuthService, private route: ActivatedRoute, private router: Router) { }

ngOnInit() {
this.route.params.subscribe(
(params: Params) => {
if (params['listId']) {
this.selectedListId = params['listId'];
let id=params['listId'];
this.taskService.getTasks(id,true).subscribe((tasks: any) => {
this.tasks = tasks;
})
} else {
//this.tasks = undefined;
this.tasks
}
}
)

this.taskService.getLists().subscribe((lists: any) => {
this.lists = lists;
})


}


onTaskClick(task: Task) {
// we want to set the task to completed
this.taskService.complete(task).subscribe(() => {
// the task has been set to completed successfully
console.log("Completed successully!");
task.completed = !task.completed;
this.ngOnInit();
})
}

onDeleteListClick() {
this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
this.router.navigate(['/lists']);
console.log(res);
})
}

onDeleteTaskClick(id: string) {
this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
this.tasks = this.tasks.filter(val => val._id !== id);
console.log(res);
})
}
}
