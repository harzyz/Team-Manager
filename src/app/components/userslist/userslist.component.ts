import { Component } from '@angular/core';
import { User, UserListData } from 'src/app/data/userdat';

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

  filteredusers: { gender: string; domain: string; available: boolean } = {
    gender: '',
    domain: '',
    available: false,
  };

  ngOnInit() {
    this.perfomSearch();
  }
  changePage(page: number): void {
    this.currentPage = page;
    console.log(this.currentPage);
  }

  selectUserForTeam(user: User): void {
    if (user.available && !user.team_member) {
      this.userlist.forEach(u => {
        if (u.domain === user.domain) {
          u.team_member = false;
        }
      });
      user.team_member = true;
    }else if(!user.available){
      window.alert('User is unavailable')
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
  }
}
