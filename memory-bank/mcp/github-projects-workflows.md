# GitHub Projects MCP Integration

This document outlines how to use the GitHub Projects integration with the MCP (Model Context Protocol) system for Different Not Less Apparel. The integration allows for automated management of GitHub Projects boards, including adding issues to projects, moving cards between columns, creating new cards, and updating project views.

## Configuration Files

The GitHub Projects MCP integration uses three configuration files to store project, column, and view IDs:

1. `project-config.json` - Maps project names to their GitHub Project IDs
2. `project-columns.json` - Maps column names to their GitHub Project column IDs
3. `project-views.json` - Maps project names to their GitHub Project IDs and view names to their view IDs

These files must be updated with the actual IDs from your GitHub Projects before using the integration.

## Available Functions

The GitHub Projects MCP integration provides the following functions:

### addIssueToProject

Adds an existing GitHub issue to a GitHub Project.

**Parameters:**
- `projectName` - The name of the project (as defined in `project-config.json`)
- `issueId` - The ID of the issue to add to the project

**Example:**
```javascript
const result = await client.callTool(
  "github.com/modelcontextprotocol/servers/tree/main/src/github",
  "execute_command",
  {
    command: `node -e "
      const { addIssueToProject } = require('./scripts/github-mcp-automation.js');
      addIssueToProject(client, {
        projectName: 'Development',
        issueId: 'I_kwDOLxyz123'
      });
    "`
  }
);
```

### moveProjectCard

Moves a project card to a different column.

**Parameters:**
- `projectId` - The ID of the project (from `project-config.json`)
- `cardId` - The ID of the card to move
- `columnName` - The name of the column to move the card to (as defined in `project-columns.json`)

**Example:**
```javascript
const result = await client.callTool(
  "github.com/modelcontextprotocol/servers/tree/main/src/github",
  "execute_command",
  {
    command: `node -e "
      const { moveProjectCard } = require('./scripts/github-mcp-automation.js');
      moveProjectCard(client, {
        projectId: 'PVT_kwDOLxyz123',
        cardId: 'PVTI_lADOLxyz123',
        columnName: 'In Progress'
      });
    "`
  }
);
```

### createProjectCard

Creates a new card in a GitHub Project.

**Parameters:**
- `projectName` - The name of the project (as defined in `project-config.json`)
- `title` - The title of the new card
- `body` - The body/description of the new card

**Example:**
```javascript
const result = await client.callTool(
  "github.com/modelcontextprotocol/servers/tree/main/src/github",
  "execute_command",
  {
    command: `node -e "
      const { createProjectCard } = require('./scripts/github-mcp-automation.js');
      createProjectCard(client, {
        projectName: 'Development',
        title: 'Implement new feature',
        body: 'This card tracks the implementation of the new feature.'
      });
    "`
  }
);
```

### updateProjectView

Updates a GitHub Project view.

**Parameters:**
- `projectName` - The name of the project (as defined in `project-views.json`)
- `viewName` - The name of the view to update (as defined in `project-views.json`)
- `newName` - (Optional) The new name for the view
- `filter` - (Optional) The filter to apply to the view

**Example:**
```javascript
const result = await client.callTool(
  "github.com/modelcontextprotocol/servers/tree/main/src/github",
  "execute_command",
  {
    command: `node -e "
      const { updateProjectView } = require('./scripts/github-mcp-automation.js');
      updateProjectView(client, {
        projectName: 'Development',
        viewName: 'Board',
        newName: 'Development Board',
        filter: 'label:bug'
      });
    "`
  }
);
```

## Integration with GitHub Actions

The GitHub Projects MCP integration can be used in GitHub Actions workflows to automate project management tasks. Here are some examples:

### Automatically Add Issues to Projects

```yaml
name: Add Issue to Project

on:
  issues:
    types: [opened]

jobs:
  add-to-project:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Add issue to project
        run: |
          const { addIssueToProject } = require('./scripts/github-mcp-automation.js');
          addIssueToProject(client, {
            projectName: 'Development',
            issueId: '${{ github.event.issue.node_id }}'
          });
```

### Move Cards Based on PR Status

```yaml
name: Move Project Card

on:
  pull_request:
    types: [opened, closed]

jobs:
  move-card:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Move card to In Progress
        if: github.event.action == 'opened'
        run: |
          const { moveProjectCard } = require('./scripts/github-mcp-automation.js');
          moveProjectCard(client, {
            projectId: 'PVT_kwDOLxyz123',
            cardId: '${{ github.event.pull_request.node_id }}',
            columnName: 'In Progress'
          });
      
      - name: Move card to Done
        if: github.event.action == 'closed' && github.event.pull_request.merged
        run: |
          const { moveProjectCard } = require('./scripts/github-mcp-automation.js');
          moveProjectCard(client, {
            projectId: 'PVT_kwDOLxyz123',
            cardId: '${{ github.event.pull_request.node_id }}',
            columnName: 'Done'
          });
```

## Getting GitHub Project IDs

To get the IDs needed for the configuration files, you can use the GitHub GraphQL API Explorer:

1. Go to https://docs.github.com/en/graphql/overview/explorer
2. Run a query to get your project IDs:

```graphql
query {
  viewer {
    projectsV2(first: 10) {
      nodes {
        id
        title
        views(first: 10) {
          nodes {
            id
            name
          }
        }
        fields(first: 20) {
          nodes {
            ... on ProjectV2SingleSelectField {
              id
              name
              options {
                id
                name
              }
            }
          }
        }
      }
    }
  }
}
```

3. Update the configuration files with the IDs from the query results.

## Troubleshooting

If you encounter issues with the GitHub Projects MCP integration, check the following:

1. Verify that the configuration files have the correct IDs
2. Check that the GitHub token has the necessary permissions (project, repo)
3. Look for error messages in the GitHub Actions logs
4. Ensure that the project, column, and view names match exactly what's in the configuration files

## Future Enhancements

Planned enhancements for the GitHub Projects MCP integration include:

1. Direct GraphQL API support in the GitHub MCP server
2. Bulk operations for managing multiple cards at once
3. Custom field support for GitHub Projects
4. Integration with other MCP servers (e.g., Airtable, Notion)
