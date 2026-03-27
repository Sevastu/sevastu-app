import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Send, ChevronLeft, MoreVertical, Phone, Video } from 'lucide-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme';
import { Text } from '../components/ui/Typography';
import { Avatar } from '../components/ui/Avatar';
import { workerService, Worker } from '../services/workerService';
import { chatService, ChatMessage } from '../services/chatService';

export const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { workerId, jobId } = route.params as { workerId: string; jobId?: string };
  const scrollViewRef = useRef<ScrollView>(null);

  const [worker, setWorker] = useState<Worker | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    fetchChatContent();
  }, [jobId, workerId]);

  const fetchChatContent = async () => {
    try {
      const workerData = await workerService.getWorkerById(workerId);
      setWorker(workerData);

      if (jobId) {
        const chatData = await chatService.getChatMessages(jobId);
        setMessages(chatData);
      } else {
        setMessages([
          {
            id: 'start',
            text: `Hi there! I am ${workerData.name}. How can I help you today?`,
            sender: 'worker',
            time: 'Just now'
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (messageText.trim()) {
      const outgoingTxt = messageText.trim();
      setMessageText('');

      const localMsg: ChatMessage = {
        id: Date.now().toString(),
        text: outgoingTxt,
        sender: 'user',
        time: 'Just now'
      };
      setMessages(prev => [...prev, localMsg]);

      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

      if (jobId) {
        try {
          await chatService.sendMessage(jobId, outgoingTxt);
        } catch (err) {
          console.error('Failed to send message', err);
        }
      }
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator color={COLORS.primary} /></View>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={COLORS.text} />
        </Pressable>
        <Pressable
          style={styles.headerInfo}
          onPress={() => (navigation as any).navigate('WorkerProfile', { workerId: worker?.id })}
        >
          <Avatar name={worker?.name} source={worker?.avatar} size={40} />
          <View style={{ marginLeft: 12 }}>
            <Text variant="label" style={{ fontWeight: '700' }}>{worker?.name}</Text>
            <Text variant="bodySmall" color={COLORS.success}>Online</Text>
          </View>
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable style={styles.actionBtn}>
            <Phone size={20} color={COLORS.text} />
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <MoreVertical size={20} color={COLORS.text} />
          </Pressable>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View style={styles.dateLabel}>
            <Text variant="caption" color={COLORS.textMuted}>TODAY</Text>
          </View>

          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                msg.sender === 'user' ? styles.userRow : styles.workerRow
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  msg.sender === 'user' ? styles.userBubble : styles.workerBubble
                ]}
              >
                <Text
                  variant="bodyMedium"
                  style={[
                    styles.messageText,
                    msg.sender === 'user' ? styles.userText : styles.workerText
                  ]}
                >
                  {msg.text}
                </Text>
                <Text
                  variant="bodySmall"
                  style={[
                    styles.timeText,
                    msg.sender === 'user' ? styles.userTime : styles.workerTime
                  ]}
                >
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor={COLORS.textMuted}
              value={messageText}
              onChangeText={setMessageText}
              multiline
            />
            <Pressable
              style={[styles.sendButton, !messageText.trim() && styles.disabledSend]}
              onPress={handleSend}
              disabled={!messageText.trim()}
            >
              <Send color={COLORS.white} size={20} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  dateLabel: {
    alignItems: 'center',
    marginVertical: 20,
  },
  messageRow: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  workerRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  workerBubble: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    lineHeight: 22,
  },
  userText: {
    color: COLORS.white,
  },
  workerText: {
    color: COLORS.text,
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  workerTime: {
    color: COLORS.textMuted,
  },
  inputWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginBottom: 2,
  },
  disabledSend: {
    opacity: 0.5,
  },
});
