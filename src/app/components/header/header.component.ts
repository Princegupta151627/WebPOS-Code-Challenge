import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebarForMe: EventEmitter <any> = new EventEmitter();
  isExpanded: boolean = false;
  sideBarOpen = true;

  formData: any;
  userName:any;


  constructor(private router: Router) { }

   
   //currentDate:any;
   currentDate: string = '';

   private interval: any;
  ngOnInit() {
    this.updateDateTime();
    this.interval = setInterval(() => {
      this.updateDateTime();
    }, 1000);

    this.userName = localStorage.getItem('name');


  
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  toggleSidebar(){
    this.toggleSidebarForMe.emit();

  }
  private updateDateTime(): void {
    const now = new Date();
    // this.currentDate = now.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" });
    this.currentDate = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
  }
 
 
home() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}
