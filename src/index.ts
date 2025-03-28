// Fixed version with logging changes to prevent JSON communication errors

/**
 * Safe logging function to handle all types of inputs and prevent JSON parsing errors
 */
function safeLog(message, data) {
  let formattedMessage = '[LOG:INFO] ';
  
  // Format the primary message
  if (message instanceof Error) {
    formattedMessage += `${message.name}: ${message.message}`;
    if (message.stack) {
      formattedMessage += `\n${message.stack}`;
    }
  } else if (typeof message === 'object' && message !== null) {
    try {
      formattedMessage += JSON.stringify(message);
    } catch (e) {
      formattedMessage += `[Unstringifiable Object: ${Object.prototype.toString.call(message)}]`;
    }
  } else {
    formattedMessage += String(message);
  }
  
  // Add additional data if provided
  if (data !== undefined) {
    formattedMessage += ' ';
    if (data instanceof Error) {
      formattedMessage += `${data.name}: ${data.message}`;
      if (data.stack) {
        formattedMessage += `\n${data.stack}`;
      }
    } else if (typeof data === 'object' && data !== null) {
      try {
        formattedMessage += JSON.stringify(data);
      } catch (e) {
        formattedMessage += `[Unstringifiable Object: ${Object.prototype.toString.call(data)}]`;
      }
    } else {
      formattedMessage += String(data);
    }
  }
  
  // Use console.error to prevent JSON communication issues
  console.error(formattedMessage);
}

/**
 * Safe error logging function with error prefix
 */
function logError(message, data) {
  let formattedMessage = '[LOG:ERROR] ';
  // Similar implementation as safeLog but with ERROR prefix
  console.error(formattedMessage + String(message));
}

/**
 * Safe warning logging function with warning prefix
 */
function logWarn(message, data) {
  let formattedMessage = '[LOG:WARN] ';
  // Similar implementation as safeLog but with WARN prefix
  console.error(formattedMessage + String(message));
}

// Fixed log method implementation
class PerplexityMCPServer {
  // Fixed log method to use stderr for all log levels
  private log(level, message) {
    if (level === 'error') {
      logError(message);
    } else if (level === 'warn') {
      logWarn(message);
    } else {
      // Use console.error for info messages too to prevent JSON communication issues
      safeLog(message);
    }
  }

  // Fixed recoveryProcedure method
  private async recoveryProcedure(error) {
    try {
      // Recovery code here...
      
      // Use logError instead of log for completion message to ensure it uses stderr
      logError('Recovery completed');
    } catch (recoveryError) {
      logError('Recovery failed: ' + (recoveryError instanceof Error ? recoveryError.message : String(recoveryError)));
    }
  }
}

// This is a simplified version of the actual implementation
// For a full implementation, please refer to the complete src/index.ts file
// This file demonstrates the key fixes needed to prevent JSON communication errors