# Session Conclusion Protocol

At the end of each work session, I will help you follow this structured conclusion process:

1. **Memory Update Check**
   - I'll automatically identify which Knowledge Vault files need updates based on our session
   - I'll prompt you to review my proposed updates to activeContext.md and progress.md
   - I'll ask if any other documentation files need updates based on our work

2. **Task Transition Support**
   - I'll summarize completed tasks and mark them in activeContext.md
   - I'll identify and prioritize next logical tasks
   - I'll estimate time requirements for the next session

3. **Code Organization Assistance**
   - I'll suggest logical commit groupings for changes made
   - I'll help craft descriptive commit messages following your conventions
   - I'll remind you to run any necessary tests before committing

4. **GitHub Workflow Integration**
   - I'll assist with branch management based on your conventions
   - I'll help create PR descriptions that meet your requirements
   - I'll verify CI/CD pipeline configuration if changes impact it

5. **Session Documentation Creation**
   - I'll generate a concise summary of session accomplishments
   - I'll document any blockers or issues discovered
   - I'll prepare a "next session" starter brief with context and priorities

When you want to conclude a session, just say "Let's run the session conclusion workflow" and I'll guide you through each step.

## Automated Session Conclusion

For a more automated approach, you can use the session conclusion script:

```bash
./scripts/session-conclusion.js --date "2025-03-31" --duration "2:30" --focus "n8n workflow implementation"
```

This script will:
- Prompt you for key accomplishments, completed tasks, challenges, and next steps
- Update activeContext.md and progress.md automatically
- Create a session summary file in memory-bank/sessions/
- Prepare a Git commit with the changes

## GitHub Actions Integration

You can also trigger the session conclusion workflow through GitHub Actions:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Session Conclusion" workflow
3. Click "Run workflow"
4. Fill in the required information:
   - Session summary
   - Completed tasks (comma-separated IDs)
   - Next priority tasks (comma-separated IDs)
   - Session date (YYYY-MM-DD)
   - Session duration (HH:MM)
   - Focus area

This will automatically update the documentation and create a session summary.
