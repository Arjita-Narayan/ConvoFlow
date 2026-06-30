// src/hooks/useGuidedChat.ts
import { useState, useCallback, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ConversationStep {
  id: string;
  botMessage: string;
  options: string[];
  nextStep: (option: string) => string | null;
}

// Romantic conversation flow for Devesh ❤️
const conversationSteps: Record<string, ConversationStep> = {
  'start': {
    id: 'start',
    botMessage: '💖 Hey Devesh! Arjita has set up this special chat just for you. How are you feeling today, my love?',
    options: ['So Happy! 😊', 'Missing You 💕', 'Feeling Romantic 🌹'],
    nextStep: (option: string) => {
      if (option === 'So Happy! 😊') return 'happy';
      if (option === 'Missing You 💕') return 'missing';
      if (option === 'Feeling Romantic 🌹') return 'romantic';
      return null;
    }
  },
  'happy': {
    id: 'happy',
    botMessage: 'Yay! Seeing you happy makes my heart skip a beat! 💓 You know what would make it even better?',
    options: ['A Virtual Hug! 🤗', 'Sweet Words ✨', 'A Surprise! 🎁'],
    nextStep: (option: string) => {
      if (option === 'A Virtual Hug! 🤗') return 'hug';
      if (option === 'Sweet Words ✨') return 'sweet_words';
      if (option === 'A Surprise! 🎁') return 'surprise';
      return null;
    }
  },
  'missing': {
    id: 'missing',
    botMessage: 'Aww baby, I miss you too! 💕 Every moment without you feels incomplete. Want to know what I love most about you?',
    options: ['Tell Me! 😍', 'Your Smile! ✨', 'Everything! 💖'],
    nextStep: (option: string) => {
      if (option === 'Tell Me! 😍') return 'love_reasons';
      if (option === 'Your Smile! ✨') return 'smile';
      if (option === 'Everything! 💖') return 'everything';
      return null;
    }
  },
  'romantic': {
    id: 'romantic',
    botMessage: 'Oh Devesh, you make my world so beautiful! 🌹 You know what I\'d love right now?',
    options: ['A Virtual Date! 🌙', 'Sweet Dreams of Us 💭', 'A Love Poem 📝'],
    nextStep: (option: string) => {
      if (option === 'A Virtual Date! 🌙') return 'virtual_date';
      if (option === 'Sweet Dreams of Us 💭') return 'dreams';
      if (option === 'A Love Poem 📝') return 'poem';
      return null;
    }
  },
  'hug': {
    id: 'hug',
    botMessage: 'Sending you the biggest virtual hug ever! 🤗💕 I wish I could wrap my arms around you right now. You\'re my favorite person in the whole world!',
    options: ['A Kiss Too? 😘', 'That Made My Day! 🌟', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'A Kiss Too? 😘') return 'kiss';
      if (option === 'That Made My Day! 🌟') return 'made_my_day';
      if (option === 'Back to Start 🔄') return 'start';
      return null;
    }
  },
  'sweet_words': {
    id: 'sweet_words',
    botMessage: 'You are the sunshine in my days and the stars in my nights. 🌟 Every moment with you is magical, and I fall in love with you more and more each day. ❤️',
    options: ['I Love You Too! 💕', 'You\'re So Sweet! 🍯', 'More Please! 🙏'],
    nextStep: (option: string) => {
      if (option === 'I Love You Too! 💕') return 'love_you';
      if (option === 'You\'re So Sweet! 🍯') return 'sweet_again';
      if (option === 'More Please! 🙏') return 'more_sweet';
      return null;
    }
  },
  'surprise': {
    id: 'surprise',
    botMessage: 'Surprise! 🎉 I was just thinking about how lucky I am to have you in my life. You\'re my greatest treasure, Devesh! 💎',
    options: ['You\'re My Treasure Too! 💎', 'So Lucky! ✨', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'You\'re My Treasure Too! 💎') return 'treasure';
      if (option === 'So Lucky! ✨') return 'lucky';
      if (option === 'Back to Start 🔄') return 'start';
      return null;
    }
  },
  'love_reasons': {
    id: 'love_reasons',
    botMessage: 'I love how you make me laugh, how you understand me, how you care for me, and how you make every day special. But mostly, I love YOU, Devesh! 💖',
    options: ['I Love You Too! 💕', 'That\'s So Sweet! 🍯', 'More Reasons! 📝'],
    nextStep: (option: string) => {
      if (option === 'I Love You Too! 💕') return 'love_you';
      if (option === 'That\'s So Sweet! 🍯') return 'sweet_again';
      if (option === 'More Reasons! 📝') return 'more_reasons';
      return null;
    }
  },
  'smile': {
    id: 'smile',
    botMessage: 'Your smile is my favorite sight! 😊 It lights up my world and makes everything better. Keep smiling, my love! 🌟',
    options: ['You Make Me Smile! 😊', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'You Make Me Smile! 😊') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      if (option === 'Back to Start 🔄') return 'start';
      return null;
    }
  },
  'everything': {
    id: 'everything',
    botMessage: 'Yes, EVERYTHING! 🌟 Your kindness, your strength, your laugh, your hugs, your heart. You\'re perfect in every way, Devesh! 💕',
    options: ['You\'re Perfect Too! 💖', 'So Sweet! 🍯', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'You\'re Perfect Too! 💖') return 'perfect';
      if (option === 'So Sweet! 🍯') return 'sweet_again';
      if (option === 'Back to Start 🔄') return 'start';
      return null;
    }
  },
  'virtual_date': {
    id: 'virtual_date',
    botMessage: 'Imagine us under the stars, holding hands, sharing secrets, and just being together. 🌙💕 I would choose you over anyone, anywhere, anytime. ❤️',
    options: ['I\'d Choose You Too! 💖', 'Let\'s Dream Together! 🌟', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'I\'d Choose You Too! 💖') return 'choose_you';
      if (option === 'Let\'s Dream Together! 🌟') return 'dream_together';
      if (option === 'Back to Start 🔄') return 'start';
      return null;
    }
  },
  'dreams': {
    id: 'dreams',
    botMessage: 'Tonight, I\'ll dream of your smile, your voice, and your warm embrace. 💭 You\'re the best part of my dreams and the reality I cherish most! 💕',
    options: ['Sweet Dreams, My Love! 🌙', 'I\'ll Dream of You Too! 💭', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'Sweet Dreams, My Love! 🌙') return 'sweet_dreams';
      if (option === 'I\'ll Dream of You Too! 💭') return 'dream_together';
      if (option === 'Back to Start 🔄') return 'start';
      return null;
    }
  },
  'poem': {
    id: 'poem',
    botMessage: 'Roses are red, violets are blue, my heart belongs to no one, except for YOU! 💖🌹 Devesh, you\'re my poetry, my melody, my everything!',
    options: ['That\'s Beautiful! 📝', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'That\'s Beautiful! 📝') return 'poem_love';
      if (option === 'I Love You! 💕') return 'love_you';
      if (option === 'Back to Start 🔄') return 'start';
      return null;
    }
  },
  'kiss': {
    id: 'kiss',
    botMessage: 'Mwah! 😘💋 Sending you a million kisses across the miles! I wish I could kiss you right now, but this will have to do until we\'re together! 💕',
    options: ['Kiss Received! 😊', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'Kiss Received! 😊') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      if (option === 'Back to Start 🔄') return 'start';
      return null;
    }
  },
  'made_my_day': {
    id: 'made_my_day',
    botMessage: 'Your smile makes my day, every single day! 🌟 I\'m so grateful for you, Devesh. You\'re my happy place! 💕',
    options: ['You\'re My Happy Place Too! 🏠', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'You\'re My Happy Place Too! 🏠') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      if (option === 'Back to Start 🔄') return 'start';
      return null;
    }
  },
  'love_you': {
    id: 'love_you',
    botMessage: 'I LOVE YOU, DEVESH! ❤️❤️❤️ With all my heart, with all my soul, with everything I am. You\'re my forever person! 💍✨',
    options: ['I Love You More! 💕', 'You\'re My Forever Too! 💖', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'I Love You More! 💕') return 'love_more';
      if (option === 'You\'re My Forever Too! 💖') return 'forever';
      if (option === 'Back to Start 🔄') return 'start';
      return null;
    }
  },
  'sweet_again': {
    id: 'sweet_again',
    botMessage: 'You\'re the sweetest person I know! 🍯 Thank you for being so amazing, Devesh. My heart is yours forever! 💕',
    options: ['I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'more_sweet': {
    id: 'more_sweet',
    botMessage: 'You\'re like honey to my heart! 🍯💕 Everything about you is beautiful, from your smile to your soul. You\'re my blessing! 🌟',
    options: ['I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'treasure': {
    id: 'treasure',
    botMessage: 'We\'re each other\'s greatest treasures! 💎💕 I\'ll always cherish you, Devesh. You mean the world to me! 🌍',
    options: ['I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'lucky': {
    id: 'lucky',
    botMessage: 'I\'m the luckiest person to have you in my life! 🍀💕 You\'re my dream come true, Devesh! 🌟',
    options: ['I\'m Lucky Too! 🍀', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'I\'m Lucky Too! 🍀') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'more_reasons': {
    id: 'more_reasons',
    botMessage: 'I love your laugh, your kindness, your strength, your patience, and how you always know how to make me smile. You\'re everything I ever wanted! 💕',
    options: ['I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'happy_again': {
    id: 'happy_again',
    botMessage: 'You make me so happy, Devesh! 😊💕 Every moment with you is a gift, and I treasure every single one! 🌟',
    options: ['I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'perfect': {
    id: 'perfect',
    botMessage: 'We\'re perfect together! 💕 Like two puzzle pieces that fit perfectly. You complete me, Devesh! 🧩',
    options: ['You Complete Me Too! 💖', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'You Complete Me Too! 💖') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'choose_you': {
    id: 'choose_you',
    botMessage: 'In every lifetime, in every universe, I would choose you, Devesh! 💖 You\'re my home, my heart, my forever! 🏠❤️',
    options: ['I\'d Choose You Too! 💕', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'I\'d Choose You Too! 💕') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'dream_together': {
    id: 'dream_together',
    botMessage: 'Let\'s dream of our future together, Devesh! 🌟 A future filled with love, laughter, and endless happiness. I can\'t wait to share it all with you! 💕',
    options: ['I Can\'t Wait Either! 💖', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'I Can\'t Wait Either! 💖') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'sweet_dreams': {
    id: 'sweet_dreams',
    botMessage: 'Sweet dreams, my love! 🌙💕 Sleep tight knowing you\'re loved more than words can say. I\'ll see you in my dreams! 💭',
    options: ['Goodnight, My Love! 🌙', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'Goodnight, My Love! 🌙') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'poem_love': {
    id: 'poem_love',
    botMessage: 'In your eyes, I see the stars, In your heart, I find my home. You\'re the beat in my heart, Devesh, The rhythm to my soul. 📝💕',
    options: ['That\'s So Beautiful! 💖', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'That\'s So Beautiful! 💖') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'love_more': {
    id: 'love_more',
    botMessage: 'You can\'t love me more than I love you! 💕 Because my love for you is infinite - it has no end! ♾️💖',
    options: ['We Both Win! 🏆', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'We Both Win! 🏆') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  },
  'forever': {
    id: 'forever',
    botMessage: 'Forever sounds perfect with you! 💍💕 Let\'s make forever start right now. I love you endlessly, Devesh! ♾️❤️',
    options: ['Forever Together! 💖', 'I Love You! 💕', 'Back to Start 🔄'],
    nextStep: (option: string) => {
      if (option === 'Forever Together! 💖') return 'happy_again';
      if (option === 'I Love You! 💕') return 'love_you';
      return 'start';
    }
  }
};

export function useGuidedChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [isProcessing, setIsProcessing] = useState(false);
  const isInitialized = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pure function to add a message - uses functional update
  const addMessage = useCallback((text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text,
      isUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage;
  }, []);

  // Initialize chat function - called once
  const initializeChat = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setMessages([]);
    setCurrentStepId('start');
    setIsProcessing(false);
    
    timeoutRef.current = setTimeout(() => {
      addMessage(conversationSteps['start'].botMessage, false);
    }, 300);
  }, [addMessage]);

  // Process option selection
  const processOption = useCallback((selectedOption: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    addMessage(selectedOption, true);

    const currentStep = conversationSteps[currentStepId];
    if (!currentStep) {
      setIsProcessing(false);
      return;
    }

    const nextStepId = currentStep.nextStep(selectedOption);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      if (nextStepId && conversationSteps[nextStepId]) {
        const nextStep = conversationSteps[nextStepId];
        addMessage(nextStep.botMessage, false);
        setCurrentStepId(nextStepId);
      } else {
        addMessage('💕 I\'ll always love you, Devesh! You\'re my everything! 💖', false);
        setCurrentStepId('end');
      }
      setIsProcessing(false);
    }, 600);
  }, [currentStepId, isProcessing, addMessage]);

  // Get current options
  const getCurrentOptions = useCallback(() => {
    const currentStep = conversationSteps[currentStepId];
    return currentStep ? currentStep.options : [];
  }, [currentStepId]);

  // Reset chat
  const resetChat = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    initializeChat();
  }, [initializeChat]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    messages,
    currentStepId,
    isProcessing,
    getCurrentOptions,
    processOption,
    initializeChat,
    resetChat
  };
}