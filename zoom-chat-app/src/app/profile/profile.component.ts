import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username:String = " ";
  number_of_friends:number = 0;
  total_time_on_zoom:number = 0;
  total_meetings_joined:number = 0;
  total_meetings_created:number = 0;
  joined_date:Date = new Date();
  friend_with_longest_connection:String = " ";
  friend_with_shortest_connection:String = " ";
  usersFriends:String[][] = [[" "]];
  participants:String[][] = [[" "]];
  user_attendance:Object[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username')!;
    this.http.get<any>('').subscribe(data => {
      this.number_of_friends = data.number_of_friends;
      this.total_time_on_zoom = data.total_time_on_zoom;
      this.total_meetings_joined = data.total_meetings_joined;
      this.total_meetings_created = data.total_meetings_created;
      this.joined_date = data.joined_date;
      this.friend_with_longest_connection = data.friend_with_longest_connection;
      this.friend_with_shortest_connection = data.friend_with_shortest_connection;
      this.usersFriends = data.usersFriends;
      this.participants = data.participants;
      this.user_attendance = data.user_attendance;
    });
  }

}
