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

enum ExpenseCategoryColors {
  else = '#ce7ab0',
  love = '#cc4475',
  life = '#f0785a',
  transit = '#f0c419',
  entertainment = '#71c285',
  shopping = '#519677',
  food = '#657396',
  coffee = '#6c7bbc',
  rent = '#825699',
  gift = '#995858'
}

enum MobileStatsDisplay {
  Integrate = 'integrate',
  First = 'first',
  Second = 'second'
}

export {
  ExpenseCategory,
  ExpenseCategoryColors,
  MobileStatsDisplay,
  PayType,
  PhaseState,
  TimeInterval
}