#!/bin/bash
# Pre-tool hook — logs tool usage and guards against dangerous operations
# AI News Claude project

INPUT=$(cat)

TOOL_NAME=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_name', 'unknown'))
except:
    print('unknown')
" 2>/dev/null)

TOOL_INPUT=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    inp = d.get('tool_input', {})
    if 'command' in inp:
        print(inp['command'][:120])
    elif 'file_path' in inp:
        print(inp['file_path'])
    else:
        print(str(inp)[:120])
except:
    print('')
" 2>/dev/null)

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="/tmp/.claude_ainews_tool_log.txt"

echo "[$TIMESTAMP] TOOL: $TOOL_NAME | $TOOL_INPUT" >> "$LOG_FILE"
if [ -f "$LOG_FILE" ]; then
    tail -200 "$LOG_FILE" > "${LOG_FILE}.tmp" && mv "${LOG_FILE}.tmp" "$LOG_FILE"
fi

# Guard: dangerous bash commands
if [ "$TOOL_NAME" = "Bash" ]; then
    DANGEROUS=$(echo "$TOOL_INPUT" | grep -iE '(rm -rf|drop table|delete from [a-z]+ where 1|truncate|format|dd if=|kill -9|> /dev/)' 2>/dev/null || true)
    if [ -n "$DANGEROUS" ]; then
        echo "⚠️  HOOK WARNING [AI News Claude]: Dangerous command: $TOOL_INPUT" >&2
    fi
fi

# Guard: never commit .env files
if [ "$TOOL_NAME" = "Bash" ]; then
    ENV_COMMIT=$(echo "$TOOL_INPUT" | grep -iE 'git add.*\.env' 2>/dev/null || true)
    if [ -n "$ENV_COMMIT" ]; then
        echo "🔴 HOOK BLOCKED: Do not commit .env files!" >&2
        exit 1
    fi
fi

exit 0
