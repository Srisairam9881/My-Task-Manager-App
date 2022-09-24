import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { AuthGuard } from './auth.guard';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';

const routes: Routes = [
/* Authentication Componenets */
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginPageComponent },
{ path: 'signup', component: SignupPageComponent },
/* List Componetents */
{ 
path: 'lists', component: TaskViewComponent,canActivate:[AuthGuard],
children:[
{ path: 'edit-list/:listId', component: EditListComponent },
],
},
/* New List Component */
{ path: 'new-list', component: NewListComponent,canActivate:[AuthGuard] },
/* Tasks Componenets */
{ path: 'lists/:listId', component: TaskViewComponent,canActivate:[AuthGuard] },
{ path: 'lists/:listId/new-task', component: NewTaskComponent,canActivate:[AuthGuard] },
{ path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent,canActivate:[AuthGuard] },
/* Completed Tasks Components */
{ path:'completed-tasks',component:CompletedTasksComponent,canActivate:[AuthGuard]},
{ path: 'completed-tasks/:listId', component: CompletedTasksComponent,canActivate:[AuthGuard] },
{ path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent,canActivate:[AuthGuard] },

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
