# Exploratory test charter: guest checkout resilience

**Mission:** Explore how guest checkout preserves a clear, recoverable state when input, timing and service behaviour are less tidy than the happy path.

- **Timebox:** 60 minutes
- **Tester:** One QA engineer, pair with developer for the final 15 minutes if a useful finding appears
- **Risks targeted:** Wrong total, duplicate/ambiguous order, lost input, inaccessible error recovery

## Explore

- Edit product, quantity and promotion in unusual sequences.
- Paste whitespace, mixed case, long strings and non-ASCII characters.
- Submit with missing/invalid data, then correct one field at a time.
- Double-click, press Enter repeatedly, navigate back/forward and refresh around submission.
- Delay, abort and return malformed responses for product and order calls.
- Resize and zoom; complete by keyboard; listen to status/error changes with a screen reader.
- Compare visible totals with request and response payloads.

## Oracles

- Agreed examples and acceptance criteria.
- Consistency between displayed, submitted and confirmed price.
- Platform conventions and WCAG 2.2 AA expectations.
- User control, clear system status, error prevention and recoverability.

## Capture

Record timestamped notes, environment/build, input sequence, request IDs and minimal screenshots/video. Distinguish observation, question, risk and confirmed defect. End with coverage achieved, findings, unanswered questions and a recommendation for the next highest-value session.
