import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './dashboard/dashboard';
import { AddMoney } from './wallet/add-money/add-money';
import { SpendMoney } from './wallet/spend-money/spend-money';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'register', component: Register},
    {
    path: '',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      {path: 'add-money', component: AddMoney},
      {path: 'spend-money', component: SpendMoney}
      // later: add-money, spend-money, transactions
    ]
  }
];
