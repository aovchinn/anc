Feature: Sign in feature
    As a registered user
    I want to have an opportunity to sign into the system
    So that I have access to all my stuff

    Scenario: Successful signing in
        Given I am on '/login' page
        When I fill 'jack@example.com' in 'Email' field
        And I fill 'secret' in 'Password' field
        And I press 'Sign in' button
        Then I should be redirected to '/profile'

    Scenario: Failed signing in
        Given I am on '/login' page
        When I fill 'jack@example.com' in 'Email' field
        And I fill '123456' in 'Password' field
        And I press 'Sign in' button
        Then I should be redirected to '/login'
        And I should see alert 'The login or password is incorrect'
