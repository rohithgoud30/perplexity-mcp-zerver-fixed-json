# Perplexity MCP Zerver (JSON Communication Fixed)

This repository contains a fixed version of the perplexity-mcp-zerver project that resolves JSON communication errors between the MCP client and server.

## The Problem

The original code was producing errors like:

```
MCP perplexity-server: Unexpected token 'R', "Recovery completed" is not valid JSON
```

This happened because some log messages were being sent to stdout (using `console.log`) instead of stderr, which interfered with the JSON communication between the MCP client and server.

## The Fix

Two specific changes were made to fix this issue:

1. Modified the `log` method to use `safeLog` for info messages instead of direct `console.log` calls:

```typescript
// Before
private log(level: 'info'|'error'|'warn', message: string) {
  if (level === 'error') {
    logError(message);
  } else if (level === 'warn') {
    logWarn(message);
  } else {
    console[level](message); // Uses console.log for 'info'
  }
}

// After
private log(level: 'info'|'error'|'warn', message: string) {
  if (level === 'error') {
    logError(message);
  } else if (level === 'warn') {
    logWarn(message);
  } else {
    // Use console.error for info messages too to prevent JSON communication issues
    safeLog(message);
  }
}
```

2. Changed the "Recovery completed" message to use `logError` directly to ensure it's sent through stderr:

```typescript
// Before
this.log('info', 'Recovery completed');

// After
// Use logError instead of log for completion message to ensure it uses stderr
logError('Recovery completed');
```

These changes ensure that all logging is properly separated from the JSON communication channel, preventing parsing errors while maintaining useful debug information.

## Original Project

This is a fixed version of the [original perplexity-mcp-zerver project](https://github.com/wysh3/perplexity-mcp-zerver), which is a Model Context Protocol (MCP) server implementation providing AI-powered research capabilities by interacting with the Perplexity website without requiring an API key.

## Features

* 🔍 Web search integration via Perplexity's web interface.
* 💬 Persistent chat history for conversational context.
* 📄 Tools for documentation retrieval, API finding, and code analysis.
* 🚫 No API Key required (relies on web interaction).
* 🛠️ TypeScript-first implementation.
* 🌐 Uses Puppeteer for browser automation.

## Installation and Usage

Please refer to the [original project's documentation](https://github.com/wysh3/perplexity-mcp-zerver) for installation and usage instructions.

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE.md file for details, consistent with the original project.