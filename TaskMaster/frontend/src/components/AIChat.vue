<template>
  <div class="ai-chat-container">
    <div class="chat-window">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="message.from"
      >
        <p><strong>{{ message.from === 'user' ? 'You' : 'AI Assistant' }}:</strong> {{ message.text }}</p>
      </div>
    </div>
    <div class="chat-input">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Ask something..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AIChat",
  data() {
    return {
      userInput: "",
      messages: [],
    };
  },
  methods: {
    sendMessage() {
      const input = this.userInput.trim();
      if (!input) return;

      this.messages.push({ from: "user", text: input });
      this.userInput = "";

      // Generate AI-like response (basic rules)
      const response = this.generateResponse(input);
      this.messages.push({ from: "ai", text: response });
    },
    generateResponse(input) {
      const lower = input.toLowerCase();

      if (lower.includes("add a task") || lower.includes("remind me") || lower.includes("schedule")) {
        return `Okay, I’ve added a task for you: "${input}".`;
      }

      if (lower.includes("priority")) {
        return "You have 3 high-priority tasks for today. Would you like me to list them?";
      }

      if (lower.includes("remind") && lower.includes("report")) {
        return "Sure, I’ll set a reminder for you to review the report at 4 PM.";
      }

      if (lower.includes("summarize") || lower.includes("meeting notes")) {
        return `Here’s the summary of yesterday’s meeting: 
1) Discussed project deadlines, 
2) Reviewed the current task list, 
3) Assigned new tasks to team members.`;
      }

      return `I'm here to help! Could you please clarify what you'd like me to do?`;
    },
  },
};
</script>

<style scoped>
.ai-chat-container {
  position: fixed;
  bottom: 50px;
  right: 10px;
  width: 80vw;
  max-height: 400px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  font-family: sans-serif;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.user {
  text-align: right;
  color: #00796b;
  margin-bottom: 10px;
}

.ai {
  text-align: left;
  color: #444;
  margin-bottom: 10px;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.chat-input button {
  margin-left: 8px;
  background-color: #00796b;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
