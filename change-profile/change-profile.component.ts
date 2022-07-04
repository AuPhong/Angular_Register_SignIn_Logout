import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ChangeProfileForm} from '../../../model/ChangeProfileForm';
import {AuthService} from '../../../service/auth.service';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.scss']
})
export class ChangeProfileComponent implements OnInit {
  form1: any = {};
  changeProfileForm: ChangeProfileForm;

  constructor(private authService: AuthService,
              private tokenService: TokenService) {
  }

  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  ngOnInit(): void {
    this.form1.name = this.tokenService.getName();
  }

  changeProfile() {
    this.changeProfileForm = new ChangeProfileForm(
      this.form1.name,
      this.form1.username,
      this.form1.email);
    this.authService.changeProfile(this.changeProfileForm).subscribe(data => {
      console.log(data);
      console.log(this.form1);
    });
  }
}
