import { Component, OnInit, AfterViewInit} from '@angular/core';
import { interval } from 'rxjs';
import Web3 from 'web3';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }


  //metamask part
  private web3: Web3 = new Web3(Web3.givenProvider);
  access: any;
  balance: any;
  
  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  async getAccount() {
    //-->Indirizzo<--
    //Il metodo commentato segue il codice della libreria di MetaMask
    /* this.metaAccess= window;
    this.access = await this.metaAccess.ethereum.request({method: 'eth_requestAccounts'}); */
    //Il codice qui sotto esegue l'accesso seguendo la libreria web3.js
    this.access = await this.web3.eth.requestAccounts();
    this.access = this.access[0];
    console.log('Indirizzo ' + this.access);
    this.myGetBalance();
    this.router.navigateByUrl('/config');
    
  }

  async myGetBalance() {
    //-->Bilancio<--
    this.balance = await this.web3.eth.getBalance(this.access);
    //Conversione non indispensabile
    //this._balance = this.web3.utils.fromWei(this.balance, "ether");
    //this.showBalance.innerHTML = ' Balance: '+ this.web3.utils.fromWei(this.balance, 'ether')+" ETH";
    console.log('Bilancio ' + this.web3.utils.fromWei(this.balance, 'ether'));
  }
}


