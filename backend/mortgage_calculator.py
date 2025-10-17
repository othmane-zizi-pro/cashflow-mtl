"""
Mortgage and investment calculations module.
"""

import os
from dotenv import load_dotenv

load_dotenv()


class MortgageCalculator:
    def __init__(self):
        """Initialize calculator with default values from environment."""
        self.interest_rate = float(os.getenv('INTEREST_RATE', '0.055'))  # 5.5% annual
        self.mortgage_term_years = int(os.getenv('MORTGAGE_TERM', '25'))
        self.down_payment_percent = float(os.getenv('DOWN_PAYMENT_PERCENT', '0.20'))  # 20%
        self.monthly_property_tax_rate = float(os.getenv('MONTHLY_PROPERTY_TAX_RATE', '0.01'))
        self.monthly_insurance = float(os.getenv('MONTHLY_INSURANCE', '200'))
        self.monthly_maintenance = float(os.getenv('MONTHLY_MAINTENANCE', '150'))

    def calculate_down_payment(self, price):
        """Calculate required down payment."""
        return price * self.down_payment_percent

    def calculate_monthly_mortgage_payment(self, price):
        """
        Calculate monthly mortgage payment using standard amortization formula.

        P = L[c(1 + c)^n]/[(1 + c)^n - 1]
        where:
        P = monthly payment
        L = loan amount (principal)
        c = monthly interest rate
        n = number of payments
        """
        principal = price * (1 - self.down_payment_percent)
        monthly_rate = self.interest_rate / 12
        num_payments = self.mortgage_term_years * 12

        if monthly_rate == 0:
            return principal / num_payments

        # Calculate monthly payment
        monthly_payment = principal * (
            monthly_rate * (1 + monthly_rate) ** num_payments
        ) / (
            (1 + monthly_rate) ** num_payments - 1
        )

        return monthly_payment

    def calculate_total_monthly_costs(self, price):
        """Calculate all monthly costs including mortgage, taxes, insurance, maintenance."""
        mortgage_payment = self.calculate_monthly_mortgage_payment(price)
        property_tax = price * self.monthly_property_tax_rate / 12
        total = mortgage_payment + property_tax + self.monthly_insurance + self.monthly_maintenance

        return {
            'mortgage_payment': round(mortgage_payment, 2),
            'property_tax': round(property_tax, 2),
            'insurance': round(self.monthly_insurance, 2),
            'maintenance': round(self.monthly_maintenance, 2),
            'total_monthly_cost': round(total, 2)
        }


class InvestmentAnalyzer:
    """Analyze real estate investment metrics."""

    @staticmethod
    def calculate_monthly_cashflow(monthly_revenue, total_monthly_costs):
        """Calculate monthly cashflow (revenue - costs)."""
        return monthly_revenue - total_monthly_costs

    @staticmethod
    def calculate_annual_cashflow(monthly_cashflow):
        """Calculate annual cashflow."""
        return monthly_cashflow * 12

    @staticmethod
    def calculate_cash_on_cash_return(annual_cashflow, down_payment):
        """
        Calculate cash-on-cash return.
        CoC = (Annual Cashflow / Total Cash Invested) * 100
        """
        if down_payment == 0:
            return 0
        return (annual_cashflow / down_payment) * 100

    @staticmethod
    def calculate_cap_rate(annual_noi, property_value):
        """
        Calculate capitalization rate.
        Cap Rate = (Net Operating Income / Property Value) * 100

        Note: NOI excludes mortgage payments but includes operating expenses
        """
        if property_value == 0:
            return 0
        return (annual_noi / property_value) * 100

    @staticmethod
    def calculate_noi(annual_revenue, annual_operating_expenses):
        """
        Calculate Net Operating Income.
        NOI = Revenue - Operating Expenses (excludes mortgage)
        """
        return annual_revenue - annual_operating_expenses

    def analyze_investment(self, price, monthly_revenue, monthly_costs_breakdown):
        """
        Perform complete investment analysis.

        Args:
            price: Property price
            monthly_revenue: Expected monthly revenue
            monthly_costs_breakdown: Dict with cost breakdown

        Returns:
            Dictionary with all investment metrics
        """
        down_payment = price * 0.20  # Assuming 20% down
        total_monthly_costs = monthly_costs_breakdown['total_monthly_cost']
        monthly_mortgage = monthly_costs_breakdown['mortgage_payment']

        # Monthly operating expenses (everything except mortgage)
        monthly_operating_expenses = (
            monthly_costs_breakdown['property_tax'] +
            monthly_costs_breakdown['insurance'] +
            monthly_costs_breakdown['maintenance']
        )

        # Calculate cashflow (includes mortgage)
        monthly_cashflow = self.calculate_monthly_cashflow(monthly_revenue, total_monthly_costs)
        annual_cashflow = self.calculate_annual_cashflow(monthly_cashflow)

        # Calculate NOI (excludes mortgage)
        annual_revenue = monthly_revenue * 12
        annual_operating_expenses = monthly_operating_expenses * 12
        annual_noi = self.calculate_noi(annual_revenue, annual_operating_expenses)

        # Calculate returns
        coc_return = self.calculate_cash_on_cash_return(annual_cashflow, down_payment)
        cap_rate = self.calculate_cap_rate(annual_noi, price)

        return {
            'down_payment': round(down_payment, 2),
            'monthly_costs': {
                'mortgage': round(monthly_mortgage, 2),
                'property_tax': round(monthly_costs_breakdown['property_tax'], 2),
                'insurance': round(monthly_costs_breakdown['insurance'], 2),
                'maintenance': round(monthly_costs_breakdown['maintenance'], 2),
                'total': round(total_monthly_costs, 2)
            },
            'monthly_revenue': round(monthly_revenue, 2),
            'monthly_cashflow': round(monthly_cashflow, 2),
            'annual_cashflow': round(annual_cashflow, 2),
            'annual_noi': round(annual_noi, 2),
            'cash_on_cash_return': round(coc_return, 2),
            'cap_rate': round(cap_rate, 2)
        }


if __name__ == '__main__':
    # Test the calculator
    calc = MortgageCalculator()
    analyzer = InvestmentAnalyzer()

    # Example property
    property_price = 450000
    monthly_revenue = 2500

    print(f"Property Analysis for ${property_price:,}")
    print("=" * 50)

    down_payment = calc.calculate_down_payment(property_price)
    print(f"\nDown Payment (20%): ${down_payment:,.2f}")

    costs = calc.calculate_total_monthly_costs(property_price)
    print(f"\nMonthly Costs:")
    print(f"  Mortgage P&I: ${costs['mortgage_payment']:,.2f}")
    print(f"  Property Tax: ${costs['property_tax']:,.2f}")
    print(f"  Insurance: ${costs['insurance']:,.2f}")
    print(f"  Maintenance: ${costs['maintenance']:,.2f}")
    print(f"  Total: ${costs['total_monthly_cost']:,.2f}")

    print(f"\nMonthly Revenue: ${monthly_revenue:,.2f}")

    analysis = analyzer.analyze_investment(property_price, monthly_revenue, costs)
    print(f"\nInvestment Metrics:")
    print(f"  Monthly Cashflow: ${analysis['monthly_cashflow']:,.2f}")
    print(f"  Annual Cashflow: ${analysis['annual_cashflow']:,.2f}")
    print(f"  Cash-on-Cash Return: {analysis['cash_on_cash_return']:.2f}%")
    print(f"  Cap Rate: {analysis['cap_rate']:.2f}%")
