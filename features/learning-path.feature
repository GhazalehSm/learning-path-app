Feature: Learning path generation

  As a learner
  I want to receive a personalized learning path for a subject I choose
  So that I can follow a structured route to reach my learning goal

  Scenario: User requests a learning path for a new subject
    Given a user enters "Dutch" as the subject they want to learn
    When they submit the request
    Then they should receive a learning path with at least one step