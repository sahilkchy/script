// Configuration
const config = {
  bot_title: 'NSIT Support Assistant',
  welcome_message: 'Hello! 👋 I\'m your NSIT Bihta Assistant. I can help you with information about admissions, courses, fees, facilities, and more. How can I assist you today?'
};

let chatHistory = [];
let isTyping = false;

// NSIT Knowledge Base
const knowledgeBase = {

  admission: {
    keywords: ['admission', 'apply', 'application', 'enroll', 'join', 'registration', 'admit'],
    response: `📋 **Admission Information**

**Admission Process:**
• Visit the official admission portal
• Check eligibility criteria for your desired course
• Fill out the online application form
• Upload required documents
• Pay the application fee
• Wait for merit list/selection

**Required Documents:**
• 10th & 12th Mark Sheets
• Transfer Certificate
• Migration Certificate
• Character Certificate
• Passport Size Photographs
• Aadhaar Card
• Category Certificate (if applicable)

🔗 Admission Portal: https://www.nsit.in/admission/`
  },

  courses: {
    keywords: ['course', 'courses', 'program', 'branch', 'stream', 'degree', 'btech', 'mtech', 'diploma'],
    response: `📚 **Courses Offered at NSIT Bihta**

• B.Tech
• Diploma Programs
• Other Technical Courses

**Popular Branches:**
• Computer Science
• Electronics
• Mechanical
• Civil
• Electrical`
  },

  fees: {
    keywords: ['fee', 'fees', 'cost', 'payment', 'tuition'],
    response: `💰 **Fee Structure Information**

• Tuition Fee  
• Development Fee  
• Laboratory Fee  
• Library Fee  
• Examination Fee  

🔗 https://www.nsit.in/fee-structure/`
  }
};

// Generate bot response
function generateResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  for (const category in knowledgeBase) {
    const data = knowledgeBase[category];
    for (const keyword of data.keywords) {
      if (lowerMessage.includes(keyword)) {
        return data.response;
      }
    }
  }

  if (/^(hi|hello|hey|namaste)/.test(lowerMessage)) {
    return `Hello! 👋 Welcome to NSIT Bihta Assistant!`;
  }

  return `Please visit https://www.nsit.in/ for more details.`;
}

// Format message
function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank">$1</a>');
}

// Add message to chat
function addMessage(content, role) {
  const container = document.getElementById('messages-container');
  const messageDiv = document.createElement('div');

  messageDiv.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`;

  const formattedContent = role === 'bot' ? formatMessage(content) : content;

  messageDiv.innerHTML = `
    <div class="max-w-[85%] px-4 py-3 bg-white rounded-2xl shadow-sm">
      <div class="text-sm">${formattedContent}</div>
    </div>
  `;

  container.appendChild(messageDiv);
}

// Typing indicator
function showTypingIndicator() {
  const container = document.getElementById('messages-container');
  const typingDiv = document.createElement('div');

  typingDiv.innerHTML = `
    <div>Typing...</div>
  `;

  container.appendChild(typingDiv);
}