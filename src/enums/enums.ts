enum ExpenseCategory {
  Else = 'else',
  Love = 'love',
  Life = 'life',
  Transit = 'transit',
  Entertainment = 'entertainment',
  Shopping = 'shopping',
  Food = 'food',
  Coffee = 'coffee',
  Rent = 'rent',
  Gift = 'gift'
}

enum PayType {
  Allpay = 'allpay',
  Treat = 'treat',
  Payfirst = 'payfirst',
  Custom = 'custom',
  Wiple = 'wiple'
}

enum PhaseState {
  Hidden = 'hidden',
  Visible = 'visible',
  Continue = 'continue',
  Back = 'back'
}

enum TimeInterval {
  Year = 'year',
  Month = 'month',
  Day = 'day'
}

export {
  ExpenseCategory,
  PayType,
  PhaseState,
  TimeInterval
}