import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import Web3 from 'web3';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'metamask-balance-app';
  
  //metamask part
  private web3: Web3 = new Web3(Web3.givenProvider);
  access: any;
  balance: any;
  ethereumButton: any;
  homeLink: string;

  constructor(private router: Router, private route: ActivatedRoute) {}


  ngOnInit(): void{
    this.homeLink = "/login";
    this.checkConnection();

      interval(2000).subscribe(() => { this.checkConnection()});
  }


  

  checkConnection() {
    const handleAccountsChanged = this.handleAccountsChanged.bind(this) as () => void;
    this.web3.eth.getAccounts().then(handleAccountsChanged);
  }

  async handleAccountsChanged(accounts) {
    let currentAccount = null;
    //se non sono collegato, mostro il pulsante di login
    if (accounts.length === 0) {
      this.homeLink = "/login";
      this.router.navigateByUrl("/login");
    }
    //altrimenti carico l'indirizzo
    else {
      currentAccount = accounts[0];
      this.access = await this.web3.eth.requestAccounts();
      this.access = this.access[0];
      this.homeLink = "/config";
      sessionStorage.setItem("access", this.access);
    }
  }


  
}
