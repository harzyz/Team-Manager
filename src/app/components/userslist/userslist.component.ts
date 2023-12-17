import { Component } from '@angular/core';
import { User, UserListData } from 'src/app/data/userdat';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css'],
})
export class UserslistComponent {
  searchText: string = '';
  currentPage = 1;
  limit = 20;
  userlist: User[] = UserListData;
  filteredlist: any = [];
  float:boolean = false;
  filtershow:boolean = false
  mobilebagecontrol:boolean = true

  filteredusers: { gender: string; domain: string; available: boolean } = {
    gender: '',
    domain: '',
    available: false,
  };

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
    this.perfomSearch();
  }
  changePage(page: number): void {
    this.currentPage = page;
    // console.log(this.currentPage);
  }
  getSelectedTeamMembers()
  : any[] {
    return this.userlist.filter(user => user.team_member);
  }

  togglefilter(){
    this.filtershow = !this.filtershow
  }

  teamShow(){
    this.mobilebagecontrol = !this.mobilebagecontrol
  }

  // selectUserForTeam(user: User): void {
  //   if (user.available && !user.team_member) {
  //     this.userlist.forEach(u => {
  //       if (u.domain === user.domain) {
  //         u.team_member = false;
  //       }
  //     });
  //     user.team_member = true;
  //     this.float = true
  //   }else if(!user.available){
  //     this.toastr.warning('User is unavailable')
  //   }
  //   console.log(user)
  // }

  removeteammemeber(user: User){
    if(user.team_member){
      user.team_member = false
      this.toastr.info('User is Removed')
    }
  }
  selectUserForTeam(user: User): void {
    if (user.available) {
      if(user.team_member){
        user.team_member = false
        this.toastr.info('User is Removed')
      } else {
        const existingTeamMember = this.userlist.find(u => u.team_member && u.domain === user.domain);
          if (existingTeamMember) {
            this.toastr.warning('User with the same domain is already in the team');
          }else{

            user.team_member = true;
            this.toastr.success('User added to the team');
            this.float = true
          }
        ;
      }
    }else if(!user.available){
      this.toastr.warning('User is unavailable')
    }
  }


  perfomSearch() {
    this.filteredlist = this.userlist.filter(
      (item) => (
        item.first_name.toLowerCase().includes(this.searchText.toLowerCase()),
        item.last_name.toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }

  applyfilters(){
    this.filteredlist = this.userlist.filter(user => 
      (this.filteredusers.domain === '' || user.domain === this.filteredusers.domain) &&
      (this.filteredusers.gender === '' || user.gender === this.filteredusers.gender) &&
      (this.filteredusers.available === false || user.available === this.filteredusers.available)
    )
    this.filtershow = false
  }
}
