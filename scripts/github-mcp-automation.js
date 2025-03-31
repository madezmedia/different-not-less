/**
 * GitHub MCP Automation Script
 * 
 * This script demonstrates how to use the GitHub MCP server to automate
 * various parts of the CI/CD workflow for Different Not Less Apparel.
 */

// Example function to report failed builds by creating GitHub issues
async function reportFailedBuild(client, buildInfo) {
  try {
    const result = await client.callTool(
      "github.com/modelcontextprotocol/servers/tree/main/src/github", 
      "create_issue", 
      {
        owner: "madezmedia",
        repo: "different-not-less",
        title: `Build Failure: ${buildInfo.workflow}`,
        body: `
# Build Failure Report

## Build Information
- **Workflow**: ${buildInfo.workflow}
- **Run ID**: ${buildInfo.runId}
- **Branch**: ${buildInfo.branch}
- **Commit**: ${buildInfo.commit}
- **Timestamp**: ${new Date().toISOString()}

## Error Details
\`\`\`
${buildInfo.error}
\`\`\`

## Failed Step
${buildInfo.failedStep}

## Possible Solutions
1. Check the error message for syntax or dependency issues
2. Verify environment variables are correctly set
3. Check for recent changes that might have caused the failure

[View Workflow Run](https://github.com/madezmedia/different-not-less/actions/runs/${buildInfo.runId})
        `,
        labels: ["bug", "build-failure", "ci-cd"],
        assignees: ["michaelshaw"]
      }
    );
    
    console.log("Created issue for failed build:", result.html_url);
    return result;
  } catch (error) {
    console.error("Error creating issue for failed build:", error);
    throw error;
  }
}

// Example function to automatically merge PRs that pass all checks
async function autoPRMerge(client, prInfo) {
  try {
    // First, check if all checks have passed
    const checksResult = await client.callTool(
      "github.com/modelcontextprotocol/servers/tree/main/src/github",
      "get_pull_request_status",
      {
        owner: "madezmedia",
        repo: "different-not-less",
        pull_number: prInfo.number
      }
    );
    
    // Only proceed if all checks have passed
    if (checksResult.state === "success") {
      // Merge the PR
      const mergeResult = await client.callTool(
        "github.com/modelcontextprotocol/servers/tree/main/src/github",
        "merge_pull_request",
        {
          owner: "madezmedia",
          repo: "different-not-less",
          pull_number: prInfo.number,
          commit_title: `Auto-merge PR #${prInfo.number}: ${prInfo.title}`,
          commit_message: `Automatically merged PR #${prInfo.number} after all checks passed.`,
          merge_method: "squash"
        }
      );
      
      console.log("Auto-merged PR:", prInfo.number);
      return mergeResult;
    } else {
      console.log(`Not merging PR #${prInfo.number} - checks state: ${checksResult.state}`);
      return { merged: false, reason: `Checks state: ${checksResult.state}` };
    }
  } catch (error) {
    console.error("Error auto-merging PR:", error);
    throw error;
  }
}

// Example function to update deployment status
async function updateDeploymentStatus(client, deployInfo) {
  try {
    // Create a comment on the commit
    const result = await client.callTool(
      "github.com/modelcontextprotocol/servers/tree/main/src/github",
      "create_or_update_file",
      {
        owner: "madezmedia",
        repo: "different-not-less",
        path: `deployments/${deployInfo.environment}/${deployInfo.id}.json`,
        content: JSON.stringify({
          id: deployInfo.id,
          environment: deployInfo.environment,
          status: deployInfo.status,
          timestamp: new Date().toISOString(),
          commit: deployInfo.commit,
          url: deployInfo.url
        }, null, 2),
        message: `Deployment update: ${deployInfo.environment} - ${deployInfo.status}`,
        branch: "main"
      }
    );
    
    console.log("Updated deployment status:", result);
    return result;
  } catch (error) {
    console.error("Error updating deployment status:", error);
    throw error;
  }
}

// Example function to create a rollback PR if needed
async function createRollbackPR(client, rollbackInfo) {
  try {
    // Create a new branch for the rollback
    const branchName = `rollback/${rollbackInfo.environment}-${rollbackInfo.timestamp}`;
    
    await client.callTool(
      "github.com/modelcontextprotocol/servers/tree/main/src/github",
      "create_branch",
      {
        owner: "madezmedia",
        repo: "different-not-less",
        branch: branchName,
        from_branch: rollbackInfo.targetCommit
      }
    );
    
    // Create a PR for the rollback
    const prResult = await client.callTool(
      "github.com/modelcontextprotocol/servers/tree/main/src/github",
      "create_pull_request",
      {
        owner: "madezmedia",
        repo: "different-not-less",
        title: `ROLLBACK: ${rollbackInfo.environment} to ${rollbackInfo.targetCommit.substring(0, 7)}`,
        body: `
# Emergency Rollback

This PR rolls back the ${rollbackInfo.environment} environment to commit ${rollbackInfo.targetCommit}.

## Reason for Rollback
${rollbackInfo.reason}

## Affected Systems
${rollbackInfo.affectedSystems.join(", ")}

## Steps After Merging
1. Verify the rollback resolves the issue
2. Create a new issue to address the root cause
3. Document the incident in the post-mortem log
        `,
        head: branchName,
        base: "main"
      }
    );
    
    console.log("Created rollback PR:", prResult.html_url);
    return prResult;
  } catch (error) {
    console.error("Error creating rollback PR:", error);
    throw error;
  }
}

// Example usage in a GitHub Action workflow
module.exports = {
  reportFailedBuild,
  autoPRMerge,
  updateDeploymentStatus,
  createRollbackPR
};
