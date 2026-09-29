# Project 43: AI Chat Endpoint

**Emganwini Nedbank Hub | Master Project Portfolio**  
*Phase 4: AI Integration (Formative Practice)*

---

## 📌 Project Overview
Build a secure, rate-limited AI chat API endpoint supporting conversational prompts for the NedPulse financial advisory platform.

## 🛠️ Tech Stack
- **Runtime**: Node.js (ESM)
- **Framework**: Express.js
- **AI Integration**: OpenAI API (GPT-3.5-Turbo / fallback local copilot)
- **Security**: JWT Authentication Middleware (`authenticateToken`)
- **Rate Limiting**: Sliding-window in-memory rate limiter

## 📋 Requirements & Deliverables

| Requirement | Implementation | Status |
|---|---|---|
| **POST /api/ai/chat endpoint** | Registered in `routes/ai.js` | ✅ Complete |
| **Accept { message: "text" }** | Validated in `controllers/aiController.js` | ✅ Complete |
| **Return AI response** | Returns `{ success: true, reply: "...", tokens: {...} }` | ✅ Complete |
| **Protected route (JWT)** | Protected with `authenticateToken` middleware | ✅ Complete |
| **Rate limiting** | Max 10 requests / minute per client/user | ✅ Complete |

## 🚀 API Specification

### Endpoint: `POST /api/ai/chat`
**Headers:**
```http
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "message": "What is the minimum balance required for the Nedbank 32-Day Notice Deposit?",
  "history": []
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "reply": "The Nedbank 32-Day Notice Deposit requires a minimum opening deposit of R1,000, offering tiered rates up to 8.75% with zero monthly administration fees.",
  "tokens": {
    "prompt_tokens": 42,
    "completion_tokens": 34,
    "total_tokens": 76
  }
}
```

**Error Response (429 Too Many Requests):**
```json
{
  "success": false,
  "error": "RateLimitExceeded",
  "message": "Too many AI requests. Please wait 1 minute before submitting another query."
}
```
