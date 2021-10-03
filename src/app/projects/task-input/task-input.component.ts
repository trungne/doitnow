import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../project.service';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
  providers: [MessageService]
})
export class TaskInputComponent implements OnInit {
  @Input() projectID!: string;
  private taskInputField: any;
  // private taskInputLabel: any;

  constructor(
    private messageService: MessageService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.taskInputField = document.querySelector("#task-input-field");
    // this.taskInputLabel = document.querySelector("#task-input-label");

    this.taskInputField.focus();
  }

  addTask(taskDescription: string){
    if (!taskDescription || !taskDescription.trim()){
      this.addWarning("Doing nothing is not quite a task, right?");
      return;
    }

    taskDescription = taskDescription.trim();
    const newTask = new Task(taskDescription);
    this.projectService.addTask(this.projectID, newTask);
    this.taskInputField.value = "";
    this.messageService.clear();

  }

  addWarning(message: string){
    const warning = document.querySelector(".p-message");
    if (warning){
      this.messageService.clear();
    }
    this.messageService.add({severity:'warn', summary:'Invalid Input', detail: message});
  }
}
