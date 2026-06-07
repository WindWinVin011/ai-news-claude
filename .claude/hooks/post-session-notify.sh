#!/bin/bash
# Post-session hook — notifies when Claude finishes a task
# AI News Claude project

TIMESTAMP=$(date '+%H:%M:%S')
LOG_FILE="/tmp/.claude_ainews_tool_log.txt"

TOOL_COUNT=0
if [ -f "$LOG_FILE" ]; then
    TOOL_COUNT=$(wc -l < "$LOG_FILE" 2>/dev/null || echo 0)
fi

osascript -e "display notification \"AI News Claude — เสร็จแล้ว (${TOOL_COUNT} tool calls)\" with title \"✅ Claude เสร็จงาน\" sound name \"Glass\"" 2>/dev/null || true

rm -f "/tmp/.claude_ainews_token_counter_global" 2>/dev/null || true

exit 0
