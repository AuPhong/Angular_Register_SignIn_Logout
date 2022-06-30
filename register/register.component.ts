import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {SignUpForm} from '../../model/SignUpForm';
import {J} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);
  signUpForm: SignUpForm;
  hide = true;
  error1: any = {
    message: 'no_user'
  };
  error2: any = {
    message: 'no_email'
  };
  success: any = {
    message: 'yes'
  };
  status = 'Please fill the form to register';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );
    this.authService.signUp(this.signUpForm).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.error1)) {
        this.status = 'Username is existed!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error2)){
        this.status = 'Email is existed!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)){
        this.status = 'Create success!';
      }
    });
  }
}
