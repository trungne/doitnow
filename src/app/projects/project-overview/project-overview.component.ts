import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
  providers: [ConfirmationService]
})
export class ProjectOverviewComponent implements OnInit {
  @Input() public project!: Project;
  public taskInputShown: boolean = false;
  constructor(
    private projectService: ProjectService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }
  
  deleteProject() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.projectService.deleteProject(this.project.id);
        }
    });
}

  showTaskInput(){
    this.taskInputShown = true;
  }

  cancel(){
    this.taskInputShown = false;
  }
}
