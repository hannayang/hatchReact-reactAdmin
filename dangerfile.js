/* eslint-disable */
import { message, danger } from 'danger';

const modifiedFiles = danger.git.modified_files.join('\n- ');
const newFiles = danger.git.created_files.join('\n- ');
message('Changed Files in this PR: \n - ' + modifiedFiles);
message('New Files in this PR: \n - ' + newFiles);

/**
 * Rule: Ensure the PR title contains a ticket key.
 * Reason: When looking at the list of PRs, seeing the ticket in the PR
 *         title makes it very efficient to know what to look at.
 */
const prTitle = danger.github.pr.title;
const ticketPattern = /^[a-zA-Z]+\/[0-9]+\s-\s/;
if (!ticketPattern.test(prTitle)) {
  fail(
    `🔍 I can't find the Github issue number in the PR title. Your team members are going to thank you when they look at the list of PRs and they are consistently formatted 🙏.\n*Example format:* \`yourname/123 - short description\``,
  );
}

/**
 * Rule: Exactly 1 reviewer is required.
 * Reason: No reviewer tends to leave a PR in a state where nobody is
 *         responsible. Similarly, more than 1 reviewer doesn't clearly state
 *         who is responsible for the review.
 */
const reviewersCount = danger.github.requested_reviewers.users.length;
if (reviewersCount === 0) {
  fail(`🕵 Whoops, I don't see any reviewers. Remember to add at least one.`);
}
