import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';

let subject: string;
let learningPath: { steps: string[] } | undefined;

Given('a user enters {string} as the subject they want to learn', function (inputSubject: string) {
  subject = inputSubject;
});

When('they submit the request', function () {
  // Placeholder logic for now — this is where we'll later call
  // the real service (eventually hitting the NestJS backend / Claude API).
  // For now, simulate a minimal response so the scenario can pass.
  learningPath = { steps: [`Intro to ${subject}`] };
});

Then('they should receive a learning path with at least one step', function () {
  assert.ok(learningPath && learningPath.steps.length > 0);
});
