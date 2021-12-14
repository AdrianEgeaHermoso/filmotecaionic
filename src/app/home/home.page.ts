import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { AlertController } from '@ionic/angular';
import { Task } from '../model/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public images=[
    {src:'/assets/img/marlon.png'},
    {src:'assets/img/marilyn.png'},
    {src:'assets/img/burt.png'},
    {src:'assets/img/marx.png'},
  ];

  edad = 0;

  constructor(
    public tasksService: TasksService,
    private router: Router,
    public alertController: AlertController,

    ) {}

    goEditTask(id : number){
      this.router.navigateByUrl(`/edit${id != undefined ? '/' + id : ''}`);
  }

  deleteTask(id:number){
    this.tasksService.deleteTask(id);
  }

  async presentAlertConfirm(t: Task) {
    const alert = await this.alertController.create({
      header: 'Delete task',
      message: `Are you sure? The task ${t.title} will be <strong>permanently deleted</strong>!!!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteTask(t.id)
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
