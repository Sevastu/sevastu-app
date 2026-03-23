import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Send } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { useRoute } from '@react-navigation/native';
import { workerService, Worker } from '../services/workerService';
import { chatService, ChatMessage } from '../services/chatService';

export const ChatScreen = () => {
    const route = useRoute();
    const { workerId, jobId } = route.params as { workerId: string; jobId?: string };

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
                // Initial generic message if no active job context
                setMessages([
                    { id: 'start', text: `Hi there! I am ${workerData.name}. How can I help you today?`, sender: 'worker', time: 'Now' },
                ]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (messageText.trim() && jobId) {
            const outgoingTxt = messageText.trim();
            setMessageText('');

            // Add temporarily for local responsiveness
            const localMsg: ChatMessage = {
                id: Date.now().toString(),
                text: outgoingTxt,
                sender: 'user',
                time: 'Now'
            };
            setMessages(prev => [...prev, localMsg]);

            try {
                const resp = await chatService.sendMessage(jobId, outgoingTxt);
                // Usually, we'd replace the local temp message with the one from the server
                // But for dummy integration, addition is fine
            } catch (err) {
                console.error('Failed to send message', err);
            }
        }
    };

    if (loading) return <View style={styles.center}><ActivityIndicator color={COLORS.primary} /></View>;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <ScrollView contentContainerStyle={styles.messagesContainer} showsVerticalScrollIndicator={false}>
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageBubble,
                            msg.sender === 'user' ? styles.userMessage : styles.workerMessage
                        ]}
                    >
                        <Text style={[
                            styles.messageText,
                            msg.sender === 'user' && styles.userMessageText
                        ]}>{msg.text}</Text>
                        <Text style={[
                            styles.timeText,
                            msg.sender === 'user' && styles.userTimeText
                        ]}>{msg.time}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={jobId ? "Type a message..." : "Book to start chatting..."}
                    value={messageText}
                    onChangeText={setMessageText}
                    multiline
                    editable={!!jobId}
                />
                <TouchableOpacity
                    style={[styles.sendButton, !jobId && { opacity: 0.5 }]}
                    onPress={handleSend}
                    disabled={!jobId}
                >
                    <Send color={COLORS.white} size={20} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5DDD5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messagesContainer: {
        padding: SPACING.md,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.sm,
        ...SHADOWS.light,
    },
    workerMessage: {
        backgroundColor: COLORS.white,
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    userMessage: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    messageText: {
        fontSize: 16,
        color: COLORS.text,
    },
    userMessageText: {
        color: COLORS.text,
    },
    timeText: {
        fontSize: 11,
        color: COLORS.gray,
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    userTimeText: {
        color: '#6B7280',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: SPACING.sm,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 24,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        maxHeight: 100,
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SPACING.sm,
    },
});
