import { Storage } from 'shared/storage'

export function session() {
  const s = Storage.get('meCurrent') || {
    account: {},
    accountBill: {},
    user: {}
  };

  // Define user role
  if (s.user.role === '0r3u8FW6') s.user.role = 102;
  if (s.user.role === '4LMFKunB') s.user.role = 101;
  if (s.user.role === 'xy0CEtGq') s.user.role = 100;

  // Define account Status
  if (s.account.status === '1fC3$693f') s.account.status = 101;
  if (s.account.status === 'Ac@6e3FA9') s.account.status = 100;
  if (s.account.status === '55e€2Ec76') s.account.status = 99;

  // Define account bill
  if (!!s.accountBill) {
    if (!!s.accountBill.planId && s.accountBill.planId === '3!O<$.M*F') s.accountBill.planId = 'P0000';
    if (!!s.accountBill.planId && s.accountBill.planId === '#D,Kx{m|.') s.accountBill.planId = 'P0001';
    if (!!s.accountBill.planId && s.accountBill.planId === 'qJn<N>B!K') s.accountBill.planId = 'P0002';
    if (!!s.accountBill.planId && s.accountBill.planId === '7V_=b0V%1') s.accountBill.planId = 'P0003';
  }

  // Return built session
  return {
    session: s,
    accountId: s.account.id,
    userId: s.user.id,
    user: s.user,
    role: s.user.role,
    isUser: s.user.role === 100,
    isManager: s.user.role === 101,
    isAdmin: s.user.role === 102,
    account: s.account,
    accountBill: s.accountBill,
    token: s.token
  }
}
