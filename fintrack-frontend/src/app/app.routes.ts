import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './dashboard/dashboard';
import { AddMoney } from './wallet/add-money/add-money';
import { SpendMoney } from './wallet/spend-money/spend-money';
import { Transactions } from './wallet/transactions/transactions';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'register', component: Register},
    {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      // later: add-money, spend-money, transactions
    ]
  },
  {path: 'transactions', component: Transactions},
  { path: '**', redirectTo: 'dashboard' }
];
