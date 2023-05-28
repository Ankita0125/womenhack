import React, { useState } from 'react';
import { View, Button, Text, TextInput, SafeAreaView, StyleSheet, ScrollView, Linking } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const prompts = [
  { text: 'Self Defense Tips', tip: 'Here are some self-defense tips:\n\n1. Be aware of your surroundings.\n2. Trust your instincts.\n3. Use your voice and body language to assert yourself.\n4. Target vulnerable areas when necessary.\n5. Practice basic self-defense techniques.\n' },
  { text: 'Safety Guidelines', tip: 'Here are some safety guidelines:\n\n1. Choose a reputable and licensed cab service.\n2. Share your ride details.\n3. Verify the driver and vehicle.\n4. Fasten your seatbelt.\n5. Keep valuables secure\n' },
  { text: 'Emergency Helplines', tip: 'Here are some Emergency helplines for you:\n\n1. 112\n2. 100\n3. 080-22943225\n' },
  { text: 'Rate your driver' },
  { text: 'Apply as a Driver', url: 'https://networkshalajg.web.app/' },
  { text: 'Other' },
];

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showPrompts, setShowPrompts] = useState(true);

  const handlePromptSelection = (prompt) => {
    setSelectedPrompt(prompt);
    setShowPrompts(false);
    if (prompt.text === 'Other') {
      setMessages(prevMessages => [...prevMessages, { text: prompt.text, sender: 'user' }]);
    } else if (prompt.url) {
      Linking.openURL(prompt.url);
    } else {
      setMessages(prevMessages => [...prevMessages, { text: prompt.tip, sender: 'bot' }]);
    }
  };

  const handleAskMore = () => {
    setSelectedPrompt(null);
    setShowPrompts(true);
    setMessages([]);
  };

  const handleGoBack = () => {
    setSelectedPrompt(null);
    setShowPrompts(true);
  };

  const handleSend = () => {
    const userMessage = inputText.trim();
    if (userMessage === '') {
      return;
    }
    setMessages(prevMessages => [...prevMessages, { text: userMessage, sender: 'user' }]);
    const botResponse = generateBotResponse(userMessage);
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      if (botResponse === 'Thanks for rating!') {
        setSelectedPrompt(null);
        setShowPrompts(true);
      }
    }, 500);
    setInputText('');
  };

  const generateBotResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes('hello')) {
      return 'Hello! How can I assist you?';
    } else if (userMessage.toLowerCase().includes('goodbye')) {
      return 'Goodbye! Have a nice day!';
    } else if (userMessage.toLowerCase().includes('hi')) {
      return 'Hello! How can I assist you?';
    } else if (userMessage.toLowerCase().includes('5 star') || userMessage.toLowerCase().includes('4 star') || userMessage.toLowerCase().includes('3 star') || userMessage.toLowerCase().includes('2 star') || userMessage.toLowerCase().includes('1 star')) {
      return 'Thanks for rating!';
    } else {
      return "I'm sorry, I didn't understand. Can you please rephrase?";
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 0 }}>
          <View style={{ flex: 0, padding: 16 }}>
            <Text style={tw`text-center text-pink-900 text-xl mt-4 `}>My Chats</Text>
            {messages.map((message, index) => (
              <Text key={index} style={{color:'#6F0023',fontWeight:600,fontStyle:'italic', backgroundColor: '#ffe5ec', borderRadius: 12, marginTop: 32, marginBottom: 6, alignSelf: message.sender === 'user' ? 'flex-start' : 'flex-end' }}>
                {message.sender === 'user' ? 'User: ' : 'Chatbot: '}{message.text}
              </Text>
            ))}
          </View>
          {showPrompts && (
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 16 }}>
              {prompts.map((prompt, index) => (
                <View key={index} style={{ marginVertical: 8 }}>
                  {prompt.url ? (
                    <Button title={prompt.text} onPress={() => handlePromptSelection(prompt)} style={styles.button} />
                  ) : (
                    <Button title={prompt.text} onPress={() => handlePromptSelection(prompt)} style={styles.button} />
                  )}
                </View>
              ))}
            </View>
          )}
          {!showPrompts && selectedPrompt && selectedPrompt.text === 'Rate your driver' && (
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 16 }}>
              <Text>Please rate your driver:</Text>
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <View key={star} style={styles.button}>
                    <Button
                      title={`${star} star`}
                      onPress={() => {
                        setMessages(prevMessages => [...prevMessages, { text: 'Thanks for rating!', sender: 'bot' }]);
                        setSelectedPrompt(null);
                        setShowPrompts(true);
                      }}
                    />
                  </View>
                ))}
              </View>
              <Button title="Ask more" onPress={handleAskMore} style={styles.button} />
            </View>
          )}
          {!showPrompts && !selectedPrompt && (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
              <Button title="Ask more" onPress={handleAskMore} style={styles.button} />
            </View>
          )}
          {!showPrompts && selectedPrompt && selectedPrompt.text !== 'Rate your driver' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
              <TextInput
                style={{ flex: 1, marginRight: 8, backgroundColor: 'white', borderWidth: 1, padding: 8 }}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type your message..."
              />
              <Button title="Send" onPress={handleSend} style={styles.button} />
              <Button title="Go back" onPress={handleGoBack} style={styles.button} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC0CB'
  },
  scrollView: {
    backgroundColor: '#ffecf5',
  },
  button: {
    marginVertical: 8,
  },
});

