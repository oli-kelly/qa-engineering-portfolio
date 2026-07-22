@checkout
Feature: Guest checkout
  So that I can access learning material without creating an account
  As a guest shopper
  I want to buy a guide and receive a clear confirmation

  Background:
    Given the guest checkout is open

  @smoke @ui
  Scenario: Apply a valid promotion before placing an order
    Given I select 2 copies of the "BDD Field Guide"
    When I apply the promotion "seniorqa"
    Then a 15% discount should be shown
    When I place the order using "bdd@example.test"
    Then the order should be confirmed at "£42.48"

  @validation @ui
  Scenario Outline: Reject an unsupported promotion clearly
    Given I select 1 copy of the "BDD Field Guide"
    When I apply the promotion "<promotion>"
    Then I should see the promotion message "Promo code is not recognised."
    And no discount should be applied

    Examples:
      | promotion |
      | EXPIRED   |
      | WELCOME50 |
