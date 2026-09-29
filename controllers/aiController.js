import { generateResponse, summarizeText, handleAIError } from '../project-42-ai-service-module/aiService.js';

export async function chat(req, res) {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Request body must contain a non-empty "message" string.'
      });
    }

    const trimmed = message.trim();

    // Construct contextual prompt with conversation history if available
    let prompt = trimmed;
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6).map((h) => `${h.role}: ${h.content}`).join('\n');
      prompt = `Conversation history:\n${recentHistory}\n\nClient inquiry: ${trimmed}\nAdvisor:`;
    }

    const reply = await generateResponse(prompt, { temperature: 0.6 });

    return res.status(200).json({
      success: true,
      reply,
      tokens: {
        prompt_tokens: Math.ceil(prompt.length / 4),
        completion_tokens: Math.ceil(reply.length / 4),
        total_tokens: Math.ceil((prompt.length + reply.length) / 4)
      }
    });
  } catch (err) {
    const aiErr = handleAIError(err);
    return res.status(aiErr.status || 500).json({
      success: false,
      error: aiErr.name,
      message: aiErr.message
    });
  }
}

export async function summarize(req, res) {
  try {
    const { text, temperature = 0.3 } = req.body;
    if (!text || text.trim().length < 20) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Text must be at least 20 characters long to summarize.'
      });
    }

    const summary = await summarizeText(text, { temperature });
    return res.status(200).json({
      success: true,
      summary,
      tokens: {
        prompt_tokens: Math.ceil(text.length / 4),
        completion_tokens: Math.ceil(summary.length / 4)
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function rag(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Refer to Project 44 for dedicated RAG retrieval pipeline.'
  });
}
