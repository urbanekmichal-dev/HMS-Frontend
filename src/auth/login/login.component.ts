import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { RestapiService } from '../../shared/restapi.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  loginRequestPayload: LoginRequestPayload ;
  registerSuccessMessage ="";
  isError: boolean | undefined;

  constructor(private authService: RestapiService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
   
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Rejestracja przebiegła pomyślnie');
          this.registerSuccessMessage = "Sprawdź swoją pocztę oraz potwierdź aktywację konta";
        }
      });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm?.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm?.get('password')?.value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
      this.toastr.success('Logowanie pomyślne');
    }, error => {
      this.toastr.error('Logowanie nie powiodło się. Spróbuj ponownie');
      //this.isError = true;
      throwError(error);
    });
  }

}
