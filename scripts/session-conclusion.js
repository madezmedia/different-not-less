#!/usr/bin/env node

/**
 * Different Not Less Apparel - Session Conclusion Script
 * 
 * This script automates the session conclusion process by:
 * 1. Updating activeContext.md with completed tasks
 * 2. Updating progress.md with latest achievements
 * 3. Creating a session summary file
 * 4. Preparing GitHub commits
 * 
 * Usage:
 *   node session-conclusion.js --date "2025-03-31" --duration "2:30" --focus "n8n workflow implementation"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Parse command line arguments
const args = process.argv.slice(2);
let date = new Date().toISOString().split('T')[0]; // Default to today
let duration = "1:00"; // Default duration
let focus = ""; // Default focus

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--date' && i + 1 < args.length) {
    date = args[i + 1];
    i++;
  } else if (args[i] === '--duration' && i + 1 < args.length) {
    duration = args[i + 1];
    i++;
  } else if (args[i] === '--focus' && i + 1 < args.length) {
    focus = args[i + 1];
    i++;
  }
}

// Paths to important files
const rootDir = path.resolve(__dirname, '..');
const activeContextPath = path.join(rootDir, 'memory-bank', 'activeContext.md');
const progressPath = path.join(rootDir, 'memory-bank', 'progress.md');
const sessionsDir = path.join(rootDir, 'memory-bank', 'sessions');
const templatePath = path.join(sessionsDir, 'session-summary-template.md');
const sessionSummaryPath = path.join(sessionsDir, `session-summary-${date}.md`);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m'
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m'
  }
};

/**
 * Main function to run the session conclusion process
 */
async function main() {
  console.log(`${colors.bright}${colors.fg.blue}========================================${colors.reset}`);
  console.log(`${colors.bright}${colors.fg.blue}  Different Not Less - Session Conclusion${colors.reset}`);
  console.log(`${colors.bright}${colors.fg.blue}========================================${colors.reset}\n`);
  
  console.log(`${colors.fg.cyan}Session Date:${colors.reset} ${date}`);
  console.log(`${colors.fg.cyan}Duration:${colors.reset} ${duration}`);
  console.log(`${colors.fg.cyan}Focus Area:${colors.reset} ${focus || "(Not specified)"}\n`);
  
  if (!focus) {
    focus = await promptUser("Please enter the focus area for this session: ");
  }
  
  // Step 1: Collect session information
  console.log(`${colors.bright}${colors.fg.yellow}Step 1: Collecting Session Information${colors.reset}`);
  
  const accomplishments = await collectMultipleInputs("Enter key accomplishments (empty line to finish):");
  const completedTasks = await collectMultipleInputs("Enter completed tasks with ticket references (empty line to finish):");
  const challenges = await collectMultipleInputs("Enter challenges encountered (empty line to finish):");
  const decisions = await collectMultipleInputs("Enter technical decisions made (empty line to finish):");
  const nextSteps = await collectMultipleInputs("Enter next steps (empty line to finish):");
  
  // Step 2: Update activeContext.md
  console.log(`\n${colors.bright}${colors.fg.yellow}Step 2: Updating activeContext.md${colors.reset}`);
  
  try {
    let activeContextContent = fs.readFileSync(activeContextPath, 'utf8');
    
    // Mark completed tasks
    completedTasks.forEach(task => {
      const taskText = task.replace(/^\[x\]\s*/, '').trim();
      // Replace "- [ ] task" with "- [x] task"
      activeContextContent = activeContextContent.replace(
        new RegExp(`- \\[ \\] ${escapeRegExp(taskText)}`, 'g'),
        `- [x] ${taskText}`
      );
    });
    
    // Add next steps if they don't exist
    let activeContextUpdated = activeContextContent;
    nextSteps.forEach(step => {
      const stepText = step.replace(/^\[ \]\s*/, '').trim();
      if (!activeContextContent.includes(stepText)) {
        // Find a good place to add the new task - look for a section with tasks
        const sections = [
          "## Active Tasks by Department",
          "### Design & Product",
          "### Technology",
          "### Marketing",
          "### Operations"
        ];
        
        let inserted = false;
        for (const section of sections) {
          if (activeContextContent.includes(section)) {
            const sectionIndex = activeContextContent.indexOf(section);
            const nextSectionIndex = findNextSectionIndex(activeContextContent, sectionIndex);
            
            // Insert before the next section or at the end if no next section
            const insertPosition = nextSectionIndex === -1 ? 
              activeContextContent.length : 
              nextSectionIndex;
            
            activeContextUpdated = 
              activeContextUpdated.substring(0, insertPosition) + 
              `- [ ] ${stepText} (Added: ${date})\n` + 
              activeContextUpdated.substring(insertPosition);
            
            inserted = true;
            break;
          }
        }
        
        // If no suitable section found, add to the end
        if (!inserted) {
          activeContextUpdated += `\n## New Tasks\n- [ ] ${stepText} (Added: ${date})\n`;
        }
      }
    });
    
    fs.writeFileSync(activeContextPath, activeContextUpdated);
    console.log(`${colors.fg.green}✓ activeContext.md updated successfully${colors.reset}`);
  } catch (error) {
    console.error(`${colors.fg.red}Error updating activeContext.md:${colors.reset}`, error);
  }
  
  // Step 3: Update progress.md
  console.log(`\n${colors.bright}${colors.fg.yellow}Step 3: Updating progress.md${colors.reset}`);
  
  try {
    let progressContent = fs.readFileSync(progressPath, 'utf8');
    
    // Update Last Updated timestamp
    progressContent = progressContent.replace(
      /## Last Updated.*/,
      `## Last Updated\n\n${date}, ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}`
    );
    
    // Mark completed tasks in What's Left to Build section
    completedTasks.forEach(task => {
      const taskText = task.replace(/^\[x\]\s*/, '').trim();
      // Replace "- [ ] task" with "- [x] task" in the What's Left to Build section
      const whatLeftSection = progressContent.indexOf("## What's Left to Build");
      if (whatLeftSection !== -1) {
        const whatLeftContent = progressContent.substring(whatLeftSection);
        const updatedWhatLeftContent = whatLeftContent.replace(
          new RegExp(`- \\[ \\] ${escapeRegExp(taskText)}`, 'g'),
          `- [x] ${taskText}`
        );
        progressContent = progressContent.substring(0, whatLeftSection) + updatedWhatLeftContent;
      }
    });
    
    // Move completed tasks to What Works section if appropriate
    // This is a simplified implementation - in a real scenario, you might want to be more selective
    if (accomplishments.length > 0) {
      const whatWorksSection = progressContent.indexOf("## What Works");
      if (whatWorksSection !== -1) {
        // Find the end of the What Works section
        const nextSectionAfterWhatWorks = findNextSectionIndex(progressContent, whatWorksSection);
        const whatWorksEndIndex = nextSectionAfterWhatWorks === -1 ? 
          progressContent.length : 
          nextSectionAfterWhatWorks;
        
        // Add accomplishments to the appropriate subsection
        // For simplicity, we'll add them to the end of the What Works section
        let updatedProgressContent = progressContent.substring(0, whatWorksEndIndex);
        
        // Add a new subsection if needed
        if (!updatedProgressContent.includes(`### ${focus}`)) {
          updatedProgressContent += `\n### ${focus}\n`;
        }
        
        // Add accomplishments
        accomplishments.forEach(accomplishment => {
          updatedProgressContent += `- ✅ ${accomplishment}\n`;
        });
        
        // Add the rest of the content
        updatedProgressContent += progressContent.substring(whatWorksEndIndex);
        progressContent = updatedProgressContent;
      }
    }
    
    fs.writeFileSync(progressPath, progressContent);
    console.log(`${colors.fg.green}✓ progress.md updated successfully${colors.reset}`);
  } catch (error) {
    console.error(`${colors.fg.red}Error updating progress.md:${colors.reset}`, error);
  }
  
  // Step 4: Create session summary
  console.log(`\n${colors.bright}${colors.fg.yellow}Step 4: Creating Session Summary${colors.reset}`);
  
  try {
    // Read template
    let templateContent = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders
    templateContent = templateContent
      .replace(/\[DATE\]/g, date)
      .replace(/\[YYYY-MM-DD\]/g, date)
      .replace(/\[HH:MM\]/g, duration)
      .replace(/\[Brief description of session focus\]/g, focus)
      .replace(/\[List of participants\]/g, 'Cline, User');
    
    // Add accomplishments
    let summaryContent = templateContent;
    
    // Replace accomplishments
    let accomplishmentsSection = '';
    accomplishments.forEach(accomplishment => {
      accomplishmentsSection += `- ${accomplishment}\n`;
    });
    summaryContent = summaryContent.replace(/- \[Major accomplishment 1\]\n- \[Major accomplishment 2\]\n- \[Major accomplishment 3\]/g, accomplishmentsSection.trim());
    
    // Replace completed tasks
    let completedTasksSection = '';
    completedTasks.forEach(task => {
      completedTasksSection += `- [x] ${task.replace(/^\[x\]\s*/, '')}\n`;
    });
    summaryContent = summaryContent.replace(/- \[x\] \[Task 1 with ticket reference if applicable\]\n- \[x\] \[Task 2 with ticket reference if applicable\]\n- \[x\] \[Task 3 with ticket reference if applicable\]/g, completedTasksSection.trim());
    
    // Replace challenges
    let challengesSection = '';
    challenges.forEach((challenge, index) => {
      challengesSection += `- **Challenge ${index + 1}:** ${challenge}\n  - **Resolution/Workaround:** [To be documented]\n`;
    });
    summaryContent = summaryContent.replace(/- \*\*Challenge 1:\*\* \[Description of challenge\]\n  - \*\*Resolution\/Workaround:\*\* \[How it was addressed or plan to address\]\n- \*\*Challenge 2:\*\* \[Description of challenge\]\n  - \*\*Resolution\/Workaround:\*\* \[How it was addressed or plan to address\]/g, challengesSection.trim());
    
    // Replace decisions
    let decisionsSection = '';
    decisions.forEach((decision, index) => {
      decisionsSection += `- **Decision ${index + 1}:** ${decision}\n  - **Rationale:** [To be documented]\n  - **Alternatives Considered:** [To be documented]\n`;
    });
    summaryContent = summaryContent.replace(/- \*\*Decision 1:\*\* \[Description of decision\]\n  - \*\*Rationale:\*\* \[Why this decision was made\]\n  - \*\*Alternatives Considered:\*\* \[What other options were evaluated\]\n- \*\*Decision 2:\*\* \[Description of decision\]\n  - \*\*Rationale:\*\* \[Why this decision was made\]\n  - \*\*Alternatives Considered:\*\* \[What other options were evaluated\]/g, decisionsSection.trim());
    
    // Replace next steps
    let nextStepsSection = '';
    nextSteps.forEach(step => {
      nextStepsSection += `- [ ] ${step.replace(/^\[ \]\s*/, '')}\n`;
    });
    summaryContent = summaryContent.replace(/- \[ \] \[Next task 1 with priority and estimated effort\]\n- \[ \] \[Next task 2 with priority and estimated effort\]\n- \[ \] \[Next task 3 with priority and estimated effort\]/g, nextStepsSection.trim());
    
    // Write to file
    fs.writeFileSync(sessionSummaryPath, summaryContent);
    console.log(`${colors.fg.green}✓ Session summary created at:${colors.reset} ${sessionSummaryPath}`);
  } catch (error) {
    console.error(`${colors.fg.red}Error creating session summary:${colors.reset}`, error);
  }
  
  // Step 5: Prepare Git commit
  console.log(`\n${colors.bright}${colors.fg.yellow}Step 5: Preparing Git Commit${colors.reset}`);
  
  const shouldCommit = await promptYesNo("Would you like to commit these changes to Git?");
  
  if (shouldCommit) {
    try {
      // Check if there are changes to commit
      const status = execSync('git status --porcelain').toString();
      
      if (status.trim() === '') {
        console.log(`${colors.fg.yellow}No changes to commit${colors.reset}`);
      } else {
        // Add files
        execSync('git add memory-bank/activeContext.md memory-bank/progress.md memory-bank/sessions/');
        console.log(`${colors.fg.green}✓ Files staged for commit${colors.reset}`);
        
        // Commit
        const commitMessage = await promptUser("Enter commit message (default: Update documentation after session on " + date + "): ");
        execSync(`git commit -m "${commitMessage || `Update documentation after session on ${date}`}"`);
        console.log(`${colors.fg.green}✓ Changes committed${colors.reset}`);
        
        // Ask about pushing
        const shouldPush = await promptYesNo("Would you like to push these changes to the remote repository?");
        
        if (shouldPush) {
          execSync('git push');
          console.log(`${colors.fg.green}✓ Changes pushed to remote repository${colors.reset}`);
        }
      }
    } catch (error) {
      console.error(`${colors.fg.red}Error with Git operations:${colors.reset}`, error.message);
    }
  }
  
  // Step 6: Conclusion
  console.log(`\n${colors.bright}${colors.fg.green}Session Conclusion Complete!${colors.reset}`);
  console.log(`${colors.fg.cyan}Summary:${colors.reset}`);
  console.log(`- activeContext.md updated with ${completedTasks.length} completed tasks`);
  console.log(`- progress.md updated with latest achievements`);
  console.log(`- Session summary created at: memory-bank/sessions/session-summary-${date}.md`);
  
  rl.close();
}

/**
 * Helper function to prompt for user input
 */
function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(`${colors.fg.cyan}${question}${colors.reset}`, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Helper function to prompt for yes/no input
 */
async function promptYesNo(question) {
  const answer = await promptUser(`${question} (y/n): `);
  return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
}

/**
 * Helper function to collect multiple inputs until an empty line is entered
 */
async function collectMultipleInputs(prompt) {
  console.log(`${colors.fg.cyan}${prompt}${colors.reset}`);
  
  const inputs = [];
  let input;
  
  do {
    input = await promptUser(`${inputs.length + 1}> `);
    if (input.trim()) {
      inputs.push(input.trim());
    }
  } while (input.trim());
  
  return inputs;
}

/**
 * Helper function to find the index of the next section heading
 */
function findNextSectionIndex(content, startIndex) {
  const sectionRegex = /^#+\s+/m;
  const contentAfterStart = content.substring(startIndex + 1);
  const match = contentAfterStart.match(sectionRegex);
  
  if (match) {
    return startIndex + 1 + match.index;
  }
  
  return -1;
}

/**
 * Helper function to escape special characters in a string for use in a regular expression
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run the main function
main().catch(error => {
  console.error(`${colors.fg.red}Error:${colors.reset}`, error);
  rl.close();
});
