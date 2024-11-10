// src/components/Chatbot.js
import React, { useState } from 'react';
import './BotPress.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const [otherQuestions, setOtherQuestions] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Predefined Q&A pairs
  const predefinedQuestions = [
    {
      id: 1,
      question: "How can I donate food?",
      answer: "To donate food, please provide: 1) Type of food 2) Quantity 3) Your location. We'll arrange pickup or provide drop-off details."
    },
    {
      id: 2,
      question: "What food items can I donate?",
      answer: "You can donate: 1) Non-perishable foods 2) Canned goods 3) Packaged foods 4) Fresh produce 5) Sealed beverages. All items must be unexpired and in original packaging."
    },
    {
      id: 3,
      question: "Where can I drop off donations?",
      answer: "We have multiple donation centers across the city. Enter your zip code and we'll show you the nearest donation center locations and operating hours."
    },
    {
      id: 4,
      question: "Do you offer food pickup services?",
      answer: "Yes! For bulk donations (25+ items), we offer free pickup services. Schedule a pickup with 24 hours notice."
    },
    {
      id: 5,
      question: "What are the food safety guidelines?",
      answer: "All donations must be: 1) Unexpired 2) In original packaging 3) Undamaged 4) Properly sealed 5) Free from contamination"
    },
    {
      id: 6,
      question: "How do I schedule a bulk donation?",
      answer: "For bulk donations, call 1-800-DONATE or email bulk@fooddonation.com with details of your donation. We'll respond within 24 hours."
    },
    // Add more questions as needed
  ];

  const getQuestionsForCurrentSet = () => {
    const startIdx = currentQuestionSet * 3;
    return predefinedQuestions.slice(startIdx, startIdx + 3);
  };

  const handleQuestionClick = (question) => {
    const userMessage = {
      text: question.question,
      sender: 'user',
      id: Date.now()
    };

    const botMessage = {
      text: question.answer,
      sender: 'bot',
      id: Date.now() + 1
    };

    setMessages([...messages, userMessage, botMessage]);
    
    // Show next set of questions
    if (currentQuestionSet * 3 + 3 < predefinedQuestions.length) {
      setCurrentQuestionSet(currentQuestionSet + 1);
    } else {
      setCurrentQuestionSet(0); // Reset to first set
    }
  };

  const handleOtherQuestion = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      id: Date.now()
    };

    const botMessage = {
      text: "Thank you for your question. We'll get back to you soon with a detailed response.",
      sender: 'bot',
      id: Date.now() + 1
    };

    // Add to other questions list and log to console
    setOtherQuestions([...otherQuestions, inputMessage]);
    console.log("Other Questions Asked:", [...otherQuestions, inputMessage]);

    setMessages([...messages, userMessage, botMessage]);
    setInputMessage('');
    setShowInput(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>{isOpen ? 'Close Chat' : 'Need Help?'}</span>
      </div>
      
      {isOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <h3>Food Donation Assistant</h3>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          
          <div className="chatbot-options">
            {getQuestionsForCurrentSet().map((q) => (
              <button
                key={q.id}
                className="question-button"
                onClick={() => handleQuestionClick(q)}
              >
                {q.question}
              </button>
            ))}
            <button 
              className="question-button other-question"
              onClick={() => setShowInput(true)}
            >
              Other Question
            </button>
          </div>

          {showInput && (
            <form onSubmit={handleOtherQuestion} className="chatbot-input-form">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your question..."
                className="chatbot-input"
              />
              <button type="submit" className="chatbot-send-button">
                Send
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
